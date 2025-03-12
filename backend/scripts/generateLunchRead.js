/**
 * Lunch Read Content Generator using Claude API
 * 
 * Environment variables required:
 * - ANTHROPIC_API_KEY: Your Claude API key from Anthropic
 */
require('dotenv').config();
const axios = require('axios');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Initialize Claude client
const claudeClient = axios.create({
  baseURL: 'https://api.anthropic.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  timeout: 60000, // 60 seconds timeout
  validateStatus: (status) => status < 500, // Handle 4xx errors in catch block
  maxContentLength: 50 * 1024 * 1024, // Max response size (50MB)
  maxBodyLength: 1 * 1024 * 1024 // Max request size (1MB)
});

// Add request/response logging
claudeClient.interceptors.request.use(request => {
  const requestId = crypto.randomBytes(4).toString('hex');
  request.metadata = { 
    startTime: new Date(),
    requestId: requestId
  };
  
  // Log basic request info
  log.info(`API Request [${requestId}] to ${request.url} started`);
  
  // Log more detailed info at debug level
  if (process.env.DEBUG === 'true') {
    const sanitizedData = { ...request.data };
    if (sanitizedData.messages) {
      // Truncate long message content for logging
      sanitizedData.messages = sanitizedData.messages.map(msg => ({
        ...msg,
        content: msg.content.length > 100 ? `${msg.content.substring(0, 100)}...` : msg.content
      }));
    }
    log.debug(`API Request [${requestId}] details:`, { 
      method: request.method,
      url: request.url,
      data: sanitizedData,
      headers: { ...request.headers, 'Authorization': '[REDACTED]' }
    });
  }
  
  return request;
});

claudeClient.interceptors.response.use(
  response => {
    const requestId = response.config.metadata.requestId;
    const duration = new Date() - response.config.metadata.startTime;
    
    log.info(`API Response [${requestId}] from ${response.config.url} received in ${duration}ms with status ${response.status}`);
    
    // Log more detailed response info at debug level
    if (process.env.DEBUG === 'true') {
      // Clone and sanitize response data
      const sanitizedData = { ...response.data };
      if (sanitizedData.choices && sanitizedData.choices[0] && sanitizedData.choices[0].message) {
        const content = sanitizedData.choices[0].message.content;
        sanitizedData.choices[0].message.content = content.length > 100 ? 
          `${content.substring(0, 100)}... [${content.length} chars total]` : content;
      }
      
      log.debug(`API Response [${requestId}] details:`, {
        status: response.status,
        headers: response.headers,
        data: sanitizedData,
        duration: `${duration}ms`
      });
    }
    
    return response;
  },
  error => {
    const request = error.config || {};
    const requestId = request.metadata ? request.metadata.requestId : 'unknown';
    const startTime = request.metadata ? request.metadata.startTime : null;
    const duration = startTime ? new Date() - startTime : 'unknown';
    
    if (error.response) {
      // Server responded with an error status code
      log.error(`API Error [${requestId}]: ${request.url} failed with status ${error.response.status} in ${duration}ms`);
      
      // Add additional context based on status code
      switch (error.response.status) {
        case 401:
          log.error(`Authentication failed. Check your API key.`);
          break;
        case 403:
          log.error(`API key authentication failed. Please check your API key and permissions.`);
          break;
        case 429:
          log.error(`Rate limit exceeded. Consider implementing backoff strategy.`);
          break;
        case 413:
          log.error(`Payload too large. Reduce request size.`);
          break;
        default:
          // Log detailed error response
          log.error(`API Error [${requestId}] details:`, {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          });
      }
    } else if (error.code === 'ECONNABORTED') {
      // Request timed out
      log.error(`API Timeout [${requestId}]: Request to ${request.url} timed out after ${request.timeout}ms`);
      // Add additional context
      log.error(`Consider increasing timeout for this specific request or breaking into smaller chunks.`);
    } else if (error.code === 'ECONNREFUSED') {
      // Connection refused
      log.error(`API Connection Error [${requestId}]: Connection refused to ${request.url}`);
      log.error(`Check network connectivity and API endpoint availability.`);
    } else {
      // Other errors (network issues, etc.)
      log.error(`API Error [${requestId}]: ${error.message || 'Unknown error'}`);
      if (error.stack) {
        log.debug(`Error stack trace:`, error.stack);
      }
    }
    
    return Promise.reject(error);
  }
);

// Utility function for retrying failed API calls
async function retryOperation(operation, maxRetries = 3, retryDelay = 2000, options = {}) {
  const { 
    retryableStatusCodes = [408, 429, 500, 502, 503, 504, 529], 
    retryableErrorCodes = ['ECONNRESET', 'ETIMEDOUT', 'ECONNABORTED', 'ECONNREFUSED'],
    statusCodeSpecificConfig = {}
  } = options;
  
  // Higher initial delay for overloaded status (529)
  const overloadedRetryDelay = options.overloadedRetryDelay || 5000; // 5 seconds initial delay for overloaded status
  
  let lastError;
  let operationId = crypto.randomBytes(4).toString('hex');
  
  log.info(`Starting operation [${operationId}] with max ${maxRetries} retries`);
  log.debug(`Retry configuration:`, {
    maxRetries,
    baseRetryDelay: retryDelay,
    overloadedRetryDelay,
    retryableStatusCodes,
    retryableErrorCodes
  });
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await operation();
      if (attempt > 1) {
        log.info(`Operation [${operationId}] succeeded after ${attempt} attempts`);
      }
      return result;
    } catch (error) {
      lastError = error;
      
      // Determine if we should retry based on the error
      let shouldRetry = false;
      let retryReason = '';
      let currentRetryDelay = retryDelay;
      
      // Check HTTP status code (server errors, throttling)
      if (error.response && error.response.status) {
        const statusCode = error.response.status;
        const shouldRetryHeader = error.response.headers && error.response.headers['x-should-retry'];
        
        // Check for status-specific config
        const specificConfig = statusCodeSpecificConfig[statusCode];
        if (specificConfig) {
          log.debug(`Using status-specific retry config for status ${statusCode}:`, specificConfig);
          if (specificConfig.initialDelay) {
            currentRetryDelay = specificConfig.initialDelay;
            log.debug(`Applied custom initial delay of ${currentRetryDelay}ms for status ${statusCode}`);
          }
        }
        
        log.debug(`Error response details for operation [${operationId}]:`, {
          statusCode,
          headers: error.response.headers,
          retryableStatusCodes,
          is529InRetryableCodes: retryableStatusCodes.includes(529),
          statusCodeInRetryableList: retryableStatusCodes.includes(statusCode),
          xShouldRetryHeader: shouldRetryHeader
        });
        
        // Always retry on status code 529 (overloaded)
        if (statusCode === 529) {
          shouldRetry = true;
          retryReason = `overloaded status code 529 (always retryable)`;
          currentRetryDelay = overloadedRetryDelay;
          log.debug(`Will retry operation [${operationId}] based on overloaded status code 529`);
        }
        // Check for x-should-retry header next - this overrides other status code checks
        else if (shouldRetryHeader === 'true') {
          shouldRetry = true;
          retryReason = `x-should-retry header is true with status code ${statusCode}`;
          log.debug(`Will retry operation [${operationId}] based on x-should-retry header being 'true'`);
        } else {
          // Fall back to status code check
          shouldRetry = retryableStatusCodes.includes(statusCode);
          retryReason = shouldRetry ? 
            `retryable status code ${statusCode}` : 
            `non-retryable status code ${statusCode}`;
          
          log.debug(`Status code ${statusCode} check for operation [${operationId}]:`, {
            isRetryable: shouldRetry,
            statusCodeList: retryableStatusCodes.join(', ')
          });
        }
        // Check for retry-after header for any retryable response
        if (shouldRetry) {
          const retryAfter = error.response.headers && error.response.headers['retry-after'];
          log.debug(`Checking retry-after header for operation [${operationId}]:`, {
            retryAfterHeaderPresent: !!retryAfter,
            retryAfterValue: retryAfter
          });
          
          if (retryAfter && !isNaN(parseInt(retryAfter, 10))) {
            // Override delay with server-specified value
            const parsedRetryAfter = parseInt(retryAfter, 10);
            currentRetryDelay = parsedRetryAfter * 1000;
            retryReason += ` (using retry-after: ${retryAfter}s)`;
            log.debug(`Using server-specified retry delay of ${parsedRetryAfter}s (${currentRetryDelay}ms)`);
          }
        }
      }
      // Check network errors
      else if (error.code) {
        shouldRetry = retryableErrorCodes.includes(error.code);
        retryReason = shouldRetry ? 
          `retryable error code ${error.code}` : 
          `non-retryable error code ${error.code}`;
      }
      
      // Skip client error checking if x-should-retry header is true or status is 529
      const xShouldRetryHeader = error.response?.headers?.['x-should-retry'];
      const status529 = error.response?.status === 529;
      log.debug(`Evaluating client error conditions for operation [${operationId}]:`, {
        statusCode: error.response?.status,
        is4xxError: error.response && error.response.status >= 400 && error.response.status < 500,
        xShouldRetryHeader,
        status529,
        shouldRetry,
        inRetryableList: error.response ? retryableStatusCodes.includes(error.response.status) : false
      });
      
      // Never skip retry for 529 status code
      if (!status529 && xShouldRetryHeader !== 'true' && 
          error.response && 
          error.response.status >= 400 && 
          error.response.status < 500 && 
          !retryableStatusCodes.includes(error.response.status)) {
        log.error(`Operation [${operationId}] failed with client error (${error.response.status}), not retrying`);
        throw error;
      }
      
      // If it's the last attempt, throw the error
      if (attempt === maxRetries) {
        log.error(`Operation [${operationId}] failed after all ${maxRetries} retry attempts`);
        throw error;
      }
      // Calculate backoff delay with jitter
      const jitter = Math.random() * 500;
      let delay = shouldRetry ? 
        currentRetryDelay * Math.pow(2, attempt - 1) + jitter : // Exponential backoff for retryable errors
        currentRetryDelay + jitter; // Fixed delay for other errors
      
      // Apply status-specific configurations for backoff
      if (error.response?.status) {
        const statusCode = error.response.status;
        const specificConfig = statusCodeSpecificConfig[statusCode];
        
        if (specificConfig) {
          log.debug(`Applying status-specific backoff for status ${statusCode}`);
          
          // Apply custom backoff factor if specified
          if (specificConfig.backoffFactor) {
            delay = currentRetryDelay * Math.pow(specificConfig.backoffFactor, attempt - 1) + jitter;
            log.debug(`Applied custom backoff factor (${specificConfig.backoffFactor}), new delay: ${Math.round(delay)}ms`);
          }
          
          // Apply max delay if specified
          if (specificConfig.maxDelay && delay > specificConfig.maxDelay) {
            delay = specificConfig.maxDelay + jitter;
            log.debug(`Capped delay at maxDelay (${specificConfig.maxDelay}ms)`);
          }
        }
      }
      
      // Special handling for 529: if delay is too short, increase it
      if (error.response?.status === 529 && delay < overloadedRetryDelay) {
        delay = overloadedRetryDelay + jitter;
        log.debug(`Enforcing minimum delay of ${overloadedRetryDelay}ms for status 529`);
      }
      // Log retry info
      if (shouldRetry) {
        log.info(`Operation [${operationId}] retry ${attempt}/${maxRetries} scheduled after ${Math.round(delay)}ms - Reason: ${retryReason}`);
        log.debug(`Retry decision details for operation [${operationId}]:`, {
          attempt,
          maxRetries,
          delay: Math.round(delay),
          baseDelay: currentRetryDelay,
          retryReason,
          statusCode: error.response?.status,
          errorCode: error.code,
          retryableStatusCodes,
          is529Retryable: retryableStatusCodes.includes(529)
        });
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        log.error(`Operation [${operationId}] failed, reason: ${retryReason}, error: ${error.message}`);
        log.debug(`Non-retry decision details for operation [${operationId}]:`, {
          statusCode: error.response?.status,
          errorCode: error.code,
          retryableStatusCodes: retryableStatusCodes.join(', '),
          xShouldRetryHeader: error.response?.headers?.['x-should-retry'],
          is529InRetryableList: retryableStatusCodes.includes(529)
        });
        throw error; // Don't retry non-retryable errors
      }
    }
  }
  
  throw lastError;
}

// Configure logging
const log = {
  info: (message) => console.log(`[INFO] ${new Date().toISOString()}: ${message}`),
  debug: (message, details) => {
    // Always log debug messages for retry logic, even without DEBUG=true
    const detailsStr = details ? ` ${JSON.stringify(details, null, 2)}` : '';
    console.log(`[DEBUG] ${new Date().toISOString()}: ${message}${detailsStr}`);
  },
  error: (message, details) => {
    const detailsStr = details ? ` ${typeof details === 'object' ? JSON.stringify(details, (key, value) => {
      if (value instanceof Error) {
        return { message: value.message, stack: value.stack };
      }
      return value;
    }, 2) : details}` : '';
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}${detailsStr}`);
  },
  success: (message) => console.log(`[SUCCESS] ${new Date().toISOString()}: ${message}`)
};

// Pool of tech topics to choose from
const topics = [
  { 
    name: 'ai-ethics', 
    description: 'Ethics and responsible use of artificial intelligence'
  },
  { 
    name: 'cloud-native', 
    description: 'Cloud-native application development and architecture'
  },
  { 
    name: 'cybersecurity', 
    description: 'Cybersecurity best practices and emerging threats'
  },
  { 
    name: 'devops', 
    description: 'DevOps methodologies, tools, and practices'
  },
  { 
    name: 'web3', 
    description: 'Web3 technologies including blockchain and decentralized applications'
  },
  { 
    name: 'microservices', 
    description: 'Microservice architecture patterns and implementation'
  },
  { 
    name: 'frontend-frameworks', 
    description: 'Modern frontend frameworks and development techniques'
  },
  { 
    name: 'machine-learning', 
    description: 'Machine learning algorithms, techniques, and applications'
  },
  { 
    name: 'data-engineering', 
    description: 'Data engineering, pipelines, and big data technologies'
  },
  { 
    name: 'api-design', 
    description: 'API design principles, patterns, and best practices'
  },
];

// Generate a random date in the future (within the next 30 days)
function generateFutureDate() {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
  
  return futureDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

// Select a random topic from the pool
function selectRandomTopic() {
  return topics[Math.floor(Math.random() * topics.length)];
}

// Generate a unique ID for the lunch read
function generateUniqueId(title) {
  const normalizedTitle = title.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  
  const randomString = crypto.randomBytes(4).toString('hex');
  return `${normalizedTitle.substring(0, 20)}-${randomString}`;
}

// Generate lunch read content using Claude API
async function generateLunchReadContent(topic, language) {
  const isEnglish = language === 'en';
  const promptLanguage = isEnglish ? 'English' : 'French';
  
  // Create prompt for Claude API call
  const prompt = `You are a technical writer creating a lunch read article about ${topic.description}. 
The article should be informative, technical but accessible, and include code examples where appropriate. 
Write the article in ${promptLanguage}.
Include a title, a brief excerpt, and suggest 2-3 appropriate tags.
Format the content in Markdown.

Create a lunch read about ${topic.description}.
The article should be 800-1200 words with:
1. An attention-grabbing title
2. A brief introduction
3. 2-4 main sections with subheadings
4. Practical code examples where appropriate
5. A brief conclusion
6. Use a friendly, professional tone
7. Include 2-3 relevant tags
8. Include a one-sentence excerpt that summarizes the article

Target a technical audience with varying levels of expertise.`;

  // Prepare API call request object for Claude
  const requestData = {
    model: "claude-3-opus-20240229",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  };
  
  const startTime = Date.now();
  
  try {
    log.info(`Starting API call for ${language} content generation on topic: ${topic.name}`);
    
    // Configure enhanced retry options specifically for content generation
    const retryOptions = {
      retryableStatusCodes: [408, 429, 500, 502, 503, 504, 529], // Explicitly include 529
      retryableErrorCodes: ['ECONNRESET', 'ETIMEDOUT', 'ECONNABORTED', 'ECONNREFUSED'],
      overloadedRetryDelay: 5000, // 5 seconds initial delay for overloaded status
      statusCodeSpecificConfig: {
        529: {
          // Special handling for overloaded status
          initialDelay: 5000,
          maxDelay: 30000,
          backoffFactor: 2.5, // More aggressive backoff for overloaded status
        }
      }
    };
    
    log.debug(`Content generation retry configuration for ${language}:`, retryOptions);
    
    // Use retry function for the API call with enhanced options
    const response = await retryOperation(async () => {
      log.info(`Making API request for ${language} content...`);
      log.debug(`API request for ${language} with topic: ${topic.name}`, { requestTime: new Date().toISOString() });
      
      const response = await claudeClient.post('/messages', requestData);
      const duration = Date.now() - startTime;
      log.info(`API call for ${language} content completed in ${duration}ms`);
      
      // Validate response format for Claude API
      if (!response.data?.content?.[0]?.text) {
        log.error(`Invalid API response format for ${language}`, { response: response.data });
        throw new Error('Invalid API response format');
      }
      
      return response;
    }, 5); // Increase max retries to 5 for better handling of temporary overloaded states
    
    // Successfully received response
    log.info(`Successfully generated ${language} content for topic: ${topic.name}`);
    
    const content = response.data.content[0].text;
    
    // Parse the generated content
    const titleMatch = content.match(/^#\s(.+?)(?:\n|$)/m);
    const title = titleMatch ? titleMatch[1].trim() : `Article on ${topic.name}`;
    
    // Extract tags based on language
    const tagRegex = isEnglish ? /tags?:?\s*\[([^\]]+)\]/i : /tags?:?\s*\[([^\]]+)\]/i;
    const tagsMatch = content.match(tagRegex);
    let tags = [];
    
    if (tagsMatch && tagsMatch[1]) {
      tags = tagsMatch[1].split(',').map(tag => 
        tag.trim().replace(/['"]/g, '')
      );
    } else {
      // Default tags if none were generated
      tags = isEnglish 
        ? ['Technology', topic.name.replace(/-/g, ' ')] 
        : ['Technologie', topic.name.replace(/-/g, ' ')];
    }
    
    // Extract excerpt based on language pattern or create one
    const excerptRegex = isEnglish 
      ? /excerpt:?\s*["'](.+?)["']/i 
      : /résumé:?\s*["'](.+?)["']/i;
    const excerptMatch = content.match(excerptRegex);
    
    let excerpt = '';
    if (excerptMatch && excerptMatch[1]) {
      excerpt = excerptMatch[1].trim();
    } else {
      // Take the first sentence as excerpt if no explicit excerpt
      const firstParagraph = content.split('\n\n')[1] || '';
      const firstSentence = firstParagraph.split(/[.!?]/)
        .filter(s => s.trim().length > 0)[0];
      excerpt = firstSentence ? firstSentence.trim() + '.' : `A guide to ${topic.name}`;
    }
    
    // Clean up the content - remove any metadata added by the AI
    let cleanContent = content
      .replace(/^title:?\s*["'](.+?)["']\s*$/im, '')
      .replace(/^tags:?\s*\[.+?\]\s*$/im, '')
      .replace(/^excerpt:?\s*["'](.+?)["']\s*$/im, '');
      
    return {
      title,
      tags,
      excerpt,
      content: cleanContent.trim(),
    };
  } catch (error) {
    // Enhanced error handling
    if (error.response?.status === 403) {
      log.error(`API Authentication failed for ${language} content generation`);
      throw new Error('API key authentication failed');
    }
    
    // Special handling for status 529 (Overloaded)
    if (error.response?.status === 529) {
      log.error(`API Overloaded (${language}): Status 529 received`, {
        status: error.response.status,
        headers: error.response.headers,
        retryInfo: 'This status indicates the API is temporarily overloaded. The request should be retried with backoff.'
      });
    }
    
    // Enhanced error logging with more details
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      log.error(`API Error (${language}): Status ${error.response.status}`, {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        shouldRetry: error.response.headers['x-should-retry'] === 'true' || error.response.status === 529
      });
    } else if (error.request) {
      // The request was made but no response was received
      log.error(`API Error (${language}): No response received from server`, {
        request: error.request,
        timeout: error.code === 'ECONNABORTED' ? 'Request timed out' : 'Unknown error'
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      log.error(`API Error (${language}): Request setup error`, {
        message: error.message,
        stack: error.stack
      });
    }
    
    // Rethrow with descriptive message
    throw new Error(`Failed to generate ${language} content for topic ${topic.name}: ${error.message}`);
  }
}

// Generate a complete lunch read (both English and French)
async function generateCompleteLunchRead() {
  try {
    const topic = selectRandomTopic();
    log.info(`Selected topic: ${topic.name}`);
    
    const date = generateFutureDate();
    log.info(`Generated publish date: ${date}`);
    
    // Initialize progress tracking
    let progress = {
      en: 'pending',
      fr: 'pending'
    };
    
    // Generate English content first
    log.info(`Generating en content for topic: ${topic.name}`);
    let enContent;
    try {
      enContent = await generateLunchReadContent(topic, 'en');
      progress.en = 'completed';
      log.success(`Successfully generated English content for topic: ${topic.name}`);
    } catch (error) {
      progress.en = 'failed';
      log.error(`Failed to generate English content for topic: ${topic.name}`, error);
      throw new Error(`English content generation failed: ${error.message}`);
    }
    
    // Only proceed with French content if English was successful
    log.info(`Generating fr content for topic: ${topic.name}`);
    let frContent;
    try {
      frContent = await generateLunchReadContent(topic, 'fr');
      progress.fr = 'completed';
      log.success(`Successfully generated French content for topic: ${topic.name}`);
    } catch (error) {
      progress.fr = 'failed';
      log.error(`Failed to generate French content for topic: ${topic.name}`, error);
      throw new Error(`French content generation failed: ${error.message}`);
    }
    
    // Update progress
    log.info(`Content generation progress: EN: ${progress.en}, FR: ${progress.fr}`);
    
    // Create lunch read object
    const lunchReadId = generateUniqueId(enContent.title);
    log.info(`Generated lunch read ID: ${lunchReadId}`);
    
    const lunchRead = {
      [lunchReadId]: {
        fr: {
          title: frContent.title,
          date,
          tags: frContent.tags,
          excerpt: frContent.excerpt,
          content: frContent.content,
        },
        en: {
          title: enContent.title,
          date,
          tags: enContent.tags,
          excerpt: enContent.excerpt,
          content: enContent.content,
        }
      }
    };
    
    log.info(`Lunch read object created successfully for ID: ${lunchReadId}`);
    return lunchRead;
  } catch (error) {
    log.error('Error generating complete lunch read', error);
    throw new Error(`Failed to generate lunch read: ${error.message}`);
  }
}

// Update lunchReads.js with the new content using simple string manipulation
  try {
    const lunchReadsPath = path.resolve(__dirname, '../../src/content/lunchReads.js');
    const backupPath = path.resolve(__dirname, `../../src/content/lunchReads.backup-${Date.now()}.js`);
    
    log.info(`Creating backup of lunchReads.js at: ${backupPath}`);
    await fs.copyFile(lunchReadsPath, backupPath);
    log.success('Backup created successfully');
  } catch (error) {
    log.error('Error creating backup', error);
    // Continue execution even if backup fails
  }
}

// Perform git operations: add, commit, and push
async function performGitOperations(lunchReadId) {
  const lunchReadsPath = path.resolve(__dirname, '../../src/content/lunchReads.js');
  const relativePath = path.relative(process.cwd(), lunchReadsPath);
  
  try {
    // Git add
    log.info(`Adding ${relativePath} to git`);
    await execPromise(`git add ${relativePath}`);
    
    // Git commit
    const commitMessage = `Add new lunch read: ${lunchReadId}`;
    log.info(`Creating git commit with message: "${commitMessage}"`);
    await execPromise(`git commit -m "${commitMessage}"`);
    
    // Git push
    log.info('Pushing changes to remote repository');
    await execPromise('git push');
    
    log.success('Git operations completed successfully');
    return true;
  } catch (error) {
    log.error('Error performing git operations', error);
    // Don't throw to avoid stopping script execution
    return false;
  }
}
// Validate API connection 
async function validateApiConnection() {
  try {
    // Test with a simple request to Claude API
    const response = await claudeClient.post('/messages', {
      model: "claude-3-opus-20240229",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: "Hello"
        }
      ]
    });
    
    if (response.status === 200 && response.data.content) {
      log.success('Successfully connected to Claude API');
      return true;
    } else {
      log.error('Invalid API response format', response.data);
      return false;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      log.error('API key authentication failed. Please check your API key.');
    } else {
      log.error('Failed to connect to Claude API', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });
    }
    return false;
  }
}

// Main function to run the script
/**
 * Format a lunch read entry object into a properly formatted string
 * @param {Object} lunchRead - The lunch read object to format
 * @param {number} indent - The number of spaces to indent
 * @returns {string} - Formatted string representation of the lunch read
 */
function formatLunchReadEntry(lunchRead, indent = 2) {
  const spaces = ' '.repeat(indent);
  
  // Helper function to properly escape string values
  const escapeString = (str) => {
    if (typeof str !== 'string') return str;
    // Replace backslashes first to avoid double-escaping
    return str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  };

  // Helper function to format a value based on its type
  const formatValue = (value, currentIndent) => {
    const indentSpaces = ' '.repeat(currentIndent);
    const nextIndentSpaces = ' '.repeat(currentIndent + indent);

    if (value === null || value === undefined) {
      return 'null';
    } else if (typeof value === 'string') {
      return `"${escapeString(value)}"`;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      return value.toString();
    } else if (Array.isArray(value)) {
      if (value.length === 0) return '[]';
      
      const items = value.map(item => 
        `${nextIndentSpaces}${formatValue(item, currentIndent + indent)}`
      ).join(',\n');
      
      return `[\n${items}\n${indentSpaces}]`;
    } else if (typeof value === 'object') {
      const keys = Object.keys(value);
      if (keys.length === 0) return '{}';
      
      const entries = keys.map(key => {
        const formattedKey = key.includes('-') ? `"${key}"` : key;
        return `${nextIndentSpaces}${formattedKey}: ${formatValue(value[key], currentIndent + indent)}`;
      }).join(',\n');
      
      return `{\n${entries}\n${indentSpaces}}`;
    } else {
      return String(value);
    }
  };

  // Start formatting the lunch read entry
  const id = lunchRead.id ? `"${lunchRead.id}"` : `"${lunchRead.id}"`;
  const formattedEntry = `${spaces}${id}: ${formatValue(lunchRead, indent + id.length + 2)}`;

  return formattedEntry;
}

/**
 * Update the lunchReads.js file with a new lunch read entry
 * @param {Object} newLunchRead - New lunch read entry to add
 * @returns {Promise<string>} - Promise that resolves with the lunch read ID
 */
async function updateLunchReadsFile(newLunchRead) {
  try {
    // Determine the lunchReads file path internally
    const lunchReadsPath = path.resolve(__dirname, '../../src/content/lunchReads.js');
    logger.info(`Reading existing lunchReads.js file from: ${lunchReadsPath}`);
    
    // Read the file as a string
    const fileContent = fs.readFileSync(lunchReadsPath, 'utf8');
    
    // No need to create backup here as it's already done in main()
    
    // Find the first opening brace after "export const lunchReads = "
    const exportMatch = fileContent.match(/export\s+const\s+lunchReads\s*=\s*{/);
    if (!exportMatch) {
      throw new Error('Could not find lunchReads object declaration in file');
    }
    
    const openingBracePos = exportMatch.index + exportMatch[0].length;
    
    // Format the new lunch read entry
    const formattedEntry = formatLunchReadEntry(newLunchRead);
    
    // Check if we need to add a comma (if there are existing entries)
    let insertContent = formattedEntry;
    const nextChar = fileContent.substring(openingBracePos, openingBracePos + 20).trim();
    const needsComma = nextChar.length > 0 && nextChar !== '}';
    
    if (needsComma) {
      insertContent += ',';
    }
    
    // Create the updated content by inserting the new entry after the opening brace
    const updatedContent = 
      fileContent.substring(0, openingBracePos) + 
      '\n' + insertContent + 
      (needsComma ? '' : '\n') +
      fileContent.substring(openingBracePos);
    
    // Write the updated content back to the file
    fs.writeFileSync(lunchReadsPath, updatedContent, 'utf8');
    
    logger.success(`Successfully updated lunchReads.js with new entry: ${newLunchRead.id}`);
    // Return the ID of the new lunch read
    return newLunchRead.id;
  } catch (error) {
    const errorMessage = `Failed to parse lunchReads object: ${error.message}`;
    logger.error(`Error updating lunchReads.js file`, { message: errorMessage, stack: error.stack });
    throw new Error(`Failed to update lunchReads.js: ${errorMessage}`);
  }
}

async function main() {
  try {
    log.info('Starting lunch read generation process');
    
    // Check if Claude API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY environment variable is not set');
    }
    
    // Validate API connection first
    const isValid = await validateApiConnection();
    if (!isValid) {
      throw new Error('Failed to validate Claude API connection');
    }
    // Create a backup first
    await createBackup();
    
    // Generate new lunch read
    const newLunchRead = await generateCompleteLunchRead();
    
    // Update the lunchReads.js file
    const newLunchReadId = await updateLunchReadsFile(newLunchRead);
    
    log.success(`Successfully generated and added new lunch read: ${newLunchReadId}`);
    
    // Perform git operations
    const gitSuccess = await performGitOperations(newLunchReadId);
    
    return {
      success: true,
      lunchReadId: newLunchReadId,
      gitOperations: gitSuccess,
    };
  } catch (error) {
    log.error('Failed to generate lunch read', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Execute the script if it's called directly
if (require.main === module) {
  main().then((result) => {
    if (result.success) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  });
}

module.exports = {
  generateLunchRead: main,
};

