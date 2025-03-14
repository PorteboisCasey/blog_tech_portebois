# Lunch Read Feature

## Overview

The "Lunch Read" feature provides fun, engaging 5-minute reads on tech topics generated by AI. These articles are designed to be consumed during a lunch break, offering entertaining and informative content with a casual, conversational tone.

## Features

- Bilingual content (French and English)
- Daily 5-minute reads on tech topics
- Fun, engaging writing style with humor and pop culture references
- Automatically generated using AI
- Organized in a dedicated section of the blog

## How to Generate New Lunch Reads

### Prerequisites

- Node.js installed
- OpenAI API key

### Setup

1. Install the required dependencies:

```bash
npm install uuid
```

2. Set your OpenAI API key as an environment variable:

```bash
# For Linux/macOS
export OPENAI_API_KEY=your_api_key_here

# For Windows (Command Prompt)
set OPENAI_API_KEY=your_api_key_here

# For Windows (PowerShell)
$env:OPENAI_API_KEY="your_api_key_here"
```

### Generating a New Article

Run the generator script:

```bash
node backend/cmd/generate-lunch-read.js
```

This will:
1. Select a random tech topic from a predefined list
2. Generate an article in English using OpenAI's API
3. Translate the article to French
4. Add the new article to the `src/content/lunchReads.js` file
5. The article will immediately be available on the website

### Automating Article Generation

The system is set up to automatically generate new articles on a daily basis:

```bash
# Generate a new article every day at 8:00 AM
0 8 * * * cd /path/to/your/project && export OPENAI_API_KEY=your_api_key_here && node backend/cmd/generate-lunch-read.js >> /path/to/logfile.log 2>&1
```

## Customizing Topics

To customize the list of potential topics, edit the `TOPICS` array in the `backend/cmd/generate-lunch-read.js` file.

## Article Structure

Each lunch read article includes:

- Catchy, fun title
- Date
- Tags (automatically generated based on content)
- Witty, intriguing excerpt
- Engaging content with a conversational tone (markdown formatted)

The articles are stored in `src/content/lunchReads.js` in both French and English versions.

## Troubleshooting

If you encounter issues:

1. Ensure your OpenAI API key is valid and has sufficient credits
2. Check that the `lunchReads.js` file exists and has the correct format
3. Verify that you have internet connectivity for API calls
4. Check the console output for specific error messages
