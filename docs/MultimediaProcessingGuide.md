# 📹🗎🖼️ **Brainiac MCP Server - Multimedia Processing Guide**

## **Overview**

The Brainiac MCP Server now provides comprehensive multimedia processing capabilities using Google's Gemini AI models. This includes document analysis, image processing, and foundational support for future video processing.

---

## **🗎 Document Processing**

### **Available Features:**

- **PDF Analysis** - Extract insights, summaries, and content from PDF documents
- **Text File Processing** - Analyze plain text files with AI reasoning
- **Multiple Input Sources** - Local files, URLs, or Base64 encoded data
- **Smart Content Extraction** - Automated parsing and understanding

### **Usage Example:**

```json
{
  "tool": "process_document",
  "args": {
    "prompt": "Summarize this document and extract the key findings and recommendations",
    "source_type": "local_path",
    "source_location": "C:/Users/Documents/research_report.pdf",
    "mime_type": "application/pdf",
    "display_name": "Research Report Q4 2025"
  }
}
```

### **Supported Source Types:**

- `"local_path"` - Process files from your computer
- `"url"` - Process documents from web URLs
- `"inline_base64"` - Direct Base64 encoded document data

### **Supported Document Types:**

- `application/pdf` - PDF documents
- `text/plain` - Plain text files
- `text/markdown` - Markdown files
- `application/msword` - Word documents (with proper conversion)

---

## **🖼️ Image Processing**

### **Available Features:**

- **Image Analysis** - Describe, analyze, and understand image content
- **Visual Question Answering** - Ask specific questions about images
- **Object Detection** - Identify objects, people, text in images
- **Scene Understanding** - Comprehensive image interpretation

### **Usage Example:**

```json
{
  "tool": "process_image",
  "args": {
    "prompt": "Analyze this image and describe what you see. Identify any text, objects, or important details.",
    "source_type": "url",
    "source_location": "https://example.com/image.jpg",
    "mime_type": "image/jpeg",
    "display_name": "Marketing Campaign Image"
  }
}
```

### **Supported Image Types:**

- `image/jpeg` - JPEG images
- `image/png` - PNG images
- `image/gif` - GIF images (static analysis)
- `image/webp` - WebP images

### **Common Use Cases:**

1. **Content Moderation** - Analyze images for compliance
2. **Accessibility** - Generate alt-text descriptions
3. **Data Extraction** - Read text from images (OCR-like)
4. **Visual Inspection** - Quality control and analysis

---

## **📹 Video Processing (Future)**

### **Planned Features:**

- **Frame Analysis** - Extract and analyze key frames
- **Audio Transcription** - Convert speech to text
- **Scene Detection** - Identify scene changes and content
- **Content Summarization** - Generate video summaries

### **Implementation Roadmap:**

1. **Phase 1** - Frame extraction and static analysis
2. **Phase 2** - Audio processing and transcription
3. **Phase 3** - Temporal analysis and scene understanding
4. **Phase 4** - Full video understanding with Gemini 2.0

---

## **🛠️ Technical Implementation**

### **Model Configuration:**

- **Document/Image Processing:** `gemini-1.5-pro-latest`
- **Temperature:** 0.2 (for consistent analysis)
- **Max Output Tokens:** 4,096
- **Context Window:** Full document/image processing

### **Processing Pipeline:**

1. **Input Validation** - Verify source type and MIME type
2. **Data Preparation** - Convert to Base64 for Gemini processing
3. **AI Analysis** - Process with multimodal Gemini model
4. **Response Generation** - Return structured analysis results
5. **Error Handling** - Graceful failure with helpful error messages

### **Performance Optimizations:**

- **Automatic Resizing** - Large images optimized for processing
- **Caching System** - Reduce redundant processing
- **Batch Processing** - Multiple files in single requests (future)
- **Streaming Responses** - Real-time results for large files (future)

---

## **🚀 Getting Started**

### **1. Ensure Google API Key**

Make sure your `.env` file has a valid Google API key:

```env
GOOGLE_API_KEY="your_actual_google_api_key_here"
```

### **2. Start the Server**

```bash
npm run build
node dist/app.js
```

### **3. Test Document Processing**

```json
{
  "tool": "process_document",
  "args": {
    "prompt": "What is this document about?",
    "source_type": "url",
    "source_location": "https://example.com/sample.pdf",
    "mime_type": "application/pdf"
  }
}
```

### **4. Test Image Processing**

```json
{
  "tool": "process_image",
  "args": {
    "prompt": "Describe this image in detail",
    "source_type": "url", 
    "source_location": "https://example.com/image.png",
    "mime_type": "image/png"
  }
}
```

---

## **📊 Advanced Features**

### **Intelligent Processing**

- **Context-Aware Analysis** - Uses Brainiac's cognitive state for enhanced understanding
- **Memory Integration** - Stores insights in working memory for future reference
- **Learning Enhancement** - Improves processing based on feedback patterns
- **Cross-Reference Analysis** - Connects insights across multiple documents/images

### **Brainiac Integration**

All multimedia processing leverages Brainiac's core capabilities:

- **Sequential Thinking** - Multi-step analysis for complex content
- **Constitutional Framework** - Ethical and accurate processing
- **Learning Engine** - Continuous improvement from usage patterns
- **Knowledge Graph** - Entity extraction and relationship mapping

---

## **🔧 Configuration Options**

### **Environment Variables:**

```env
# Multimodal Processing
BRAINIAC_MAX_FILE_SIZE_MB=50
BRAINIAC_IMAGE_QUALITY=high
BRAINIAC_DOCUMENT_OCR=true

# Processing Behavior  
BRAINIAC_AUTO_EXTRACT_ENTITIES=true
BRAINIAC_GENERATE_SUMMARIES=true
BRAINIAC_STORE_INSIGHTS=true
```

### **Runtime Options:**

- **File Size Limits** - Configurable maximum file sizes
- **Quality Settings** - Balance between speed and accuracy
- **Output Format** - JSON, markdown, or plain text responses
- **Batch Processing** - Process multiple files simultaneously

---

## **📈 Future Enhancements**

### **Upcoming Features:**

1. **Video Processing** - Full video analysis capabilities
2. **Multi-Document Analysis** - Compare and contrast multiple documents
3. **Real-Time Processing** - Streaming analysis for large files
4. **Custom Model Training** - Domain-specific processing improvements
5. **API Integrations** - Connect with external multimedia services

### **Performance Improvements:**

- **GPU Acceleration** - Faster processing for large files
- **Distributed Processing** - Scale across multiple servers
- **Advanced Caching** - Intelligent content-based caching
- **Compression Optimization** - Efficient data transfer and storage

---

## **🆘 Troubleshooting**

### **Common Issues:**

**"Multimodal Gemini model is not initialized"**

- Ensure Google API key is valid and set in `.env`
- Restart the server after updating the API key

**"Failed to fetch document/image from URL"**

- Check URL accessibility and file permissions
- Verify MIME type matches actual file format

**"File too large for processing"**

- Use local file compression before processing
- Consider splitting large documents into sections

**Memory or Performance Issues**

- Reduce max file size limits in configuration
- Enable image quality reduction for faster processing
- Monitor server resources during heavy usage

---

## **💡 Best Practices**

1. **Optimize File Sizes** - Compress images and documents before processing
2. **Use Descriptive Prompts** - Specific prompts yield better analysis results
3. **Batch Similar Tasks** - Group related processing for efficiency
4. **Monitor Usage** - Track API usage to avoid rate limits
5. **Cache Results** - Store frequently accessed analysis results
6. **Validate Inputs** - Always verify file formats and accessibility

---

*The Brainiac MCP Server's multimedia processing capabilities are powered by Google's Gemini AI and enhanced with Brainiac's advanced reasoning engine for superior analysis and understanding.*
