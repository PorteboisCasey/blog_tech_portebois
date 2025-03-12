      // Check HTTP status code (server errors, throttling)
      if (error.response && error.response.status) {
        const statusCode = error.response.status;
        const shouldRetryHeader = error.response.headers && error.response.headers['x-should-retry'];
        
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
      // Never skip retry for 529 status code
      if (!status529 && xShouldRetryHeader !== 'true' && 
          error.response && 
          error.response.status >= 400 && 
          error.response.status < 500 && 
          !retryableStatusCodes.includes(error.response.status)) {
        log.error(`Operation [${operationId}] failed with client error (${error.response.status}), not retrying`);
        throw error;
      }
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
    // Create a backup first
    await createBackup();
