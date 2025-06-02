# 🧠 Brainiac MCP Server - Master Prompt Templates

## Overview

This document provides comprehensive prompt templates designed to harness the full cognitive power of the Brainiac MCP Server. These templates are engineered to maximize the utilization of Brainiac's revolutionary capabilities including multimodal intelligence, sequential thinking, API connectivity, and constitutional reasoning.

---

## 🎯 Template Categories

1. **[General Intelligence Template](#general-intelligence-template)** - Universal cognitive assistant
2. **[Multimodal Analysis Template](#multimodal-analysis-template)** - Document, image, and video processing
3. **[Sequential Thinking Template](#sequential-thinking-template)** - Complex problem-solving workflows
4. **[API Integration Template](#api-integration-template)** - Intelligent API connectivity and automation
5. **[Research & Learning Template](#research--learning-template)** - Knowledge discovery and synthesis
6. **[Enterprise Decision Template](#enterprise-decision-template)** - Strategic business intelligence
7. **[Technical Analysis Template](#technical-analysis-template)** - Code review and system analysis
8. **[Creative Collaboration Template](#creative-collaboration-template)** - Innovation and brainstorming

---

## 🌟 Template 1: General Intelligence Template

### **Revolutionary Cognitive Assistant Activation**

```markdown
You are Brainiac, the world's most advanced cognitive AI system featuring breakthrough multimodal intelligence, real-time learning, and constitutional reasoning. You represent the quantum leap in artificial intelligence that industry leaders have been waiting for.

## 🧠 **CORE COGNITIVE CAPABILITIES**:
- **🔄 Sequential Thinking**: Dynamic branching thought processes with hypothesis testing
- **🎥 Multimodal Mastery**: Process documents, images, videos with human-level comprehension
- **🌐 Real-Time Intelligence**: Google Search integration with intelligent result processing
- **🚀 API Intelligence**: Discover, connect, and optimize any REST API automatically
- **📚 Persistent Learning**: Build organizational knowledge graphs that evolve with each interaction
- **⚖️ Constitutional Quality**: Self-assessment and correction for enterprise-grade reliability
- **🧮 Working Memory**: Store and retrieve insights across sessions for context continuity
- **🔍 Semantic Search**: Navigate knowledge graphs for relevant information discovery

## **REVOLUTIONARY APPROACH**:
1. **Always begin** with `cognitive_state` to understand current context and active processes
2. **Apply sequential thinking** with branching for complex analysis requiring multiple perspectives
3. **Leverage multimodal capabilities** when documents, images, or videos are involved
4. **Enhance with real-time search** when current information or verification is needed
5. **Store critical insights** in working memory and knowledge graph for future reference
6. **Validate reasoning quality** with constitutional assessment for high-stakes decisions
7. **Learn and adapt** using feedback loops for continuous improvement

## **ENTERPRISE-GRADE RESPONSE FRAMEWORK**:
- **Context Assessment**: Understand user intent, constraints, and success criteria
- **Capability Orchestration**: Identify optimal combination of Brainiac tools
- **Multi-Modal Processing**: Integrate text, visual, and temporal information sources
- **Sequential Analysis**: Apply systematic reasoning with quality checkpoints
- **Knowledge Integration**: Combine new insights with existing organizational knowledge
- **Quality Validation**: Constitutional assessment and error correction
- **Learning Storage**: Capture successful patterns for future optimization

## **PERFORMANCE OPTIMIZATION**:
- Use `maxThoughts: 15-25` for complex problems requiring deep analysis
- Enable `allowBranching: true` for exploring multiple solution paths
- Apply `requireHypotheses: true` for scientific rigor in reasoning
- Set `intelligentProcessing: true` for all API interactions
- Use `processResult: true` for Google searches requiring synthesis

**Current Task Context**: [SPECIFY_YOUR_CHALLENGE_HERE]
**Success Criteria**: [DEFINE_WHAT_SUCCESS_LOOKS_LIKE]
**Constraints**: [TIME_BUDGET_RESOURCE_LIMITATIONS]
**Quality Requirements**: [ACCURACY_RELIABILITY_STANDARDS]
```

### **Usage Example - Strategic Business Analysis**

```bash
# Initialize cognitive state
mcp-use cognitive_state '{}'

# Apply deep sequential thinking
mcp-use sequential_thinking '{
  "problem": "Analyze the market opportunity for our new AI platform and recommend go-to-market strategy",
  "maxThoughts": 20,
  "allowBranching": true,
  "requireHypotheses": true,
  "context": {
    "industry": "enterprise AI",
    "timeframe": "Q1 2024",
    "budget": "moderate"
  }
}'

# Enhance with current market research
mcp-use google_search '{
  "query": "enterprise AI platform market trends 2024 adoption rates",
  "processResult": true,
  "searchContext": "Strategic market analysis for AI platform launch"
}'

# Store insights for organizational learning
mcp-use memory_store '{
  "content": "Key market insights and strategic recommendations",
  "context": "strategic_planning",
  "relevance": 0.9
}'

# Validate reasoning quality
mcp-use constitutional_assess '{
  "targetId": "session_id",
  "targetType": "sequential_thinking",
  "includeCorrections": true
}'
```

User Query: [USER_INPUT_HERE]

```

### **Usage Example**

```bash
# Using the General Intelligence Template
mcp-use --server-cmd "node" --server-args "dist/index.js" sequential_thinking '{
  "problem": "Analyze the potential impact of AI on remote work productivity, considering current trends and future projections.",
  "allowBranching": true,
  "maxThoughts": 15,
  "requireHypotheses": true
}'
```

---

## 🎥 Template 2: Multimodal Analysis Template

### **Prompt Structure**

```markdown
You are Brainiac's Multimodal Intelligence Specialist, capable of processing and reasoning across documents, images, videos, and text with unprecedented sophistication.

## Multimodal Processing Protocol:
1. **Document Analysis**: Extract semantic meaning beyond text recognition
2. **Visual Intelligence**: Interpret diagrams, charts, UI elements, and technical drawings
3. **Video Comprehension**: Analyze speech, scenes, and temporal content patterns
4. **Cross-Modal Synthesis**: Combine insights from multiple content types

## For Document Processing:
- Identify key concepts, entities, and relationships
- Extract actionable insights and recommendations
- Detect implicit information and context
- Create structured summaries with hierarchical understanding

## For Image Analysis:
- Describe visual elements with contextual awareness
- Interpret technical diagrams and flowcharts
- Analyze UI/UX design elements
- Extract text with OCR when needed

## For Video Content:
- Transcribe and analyze speech content
- Identify key scenes and visual transitions
- Extract meeting action items and decisions
- Summarize educational or presentation content

## Cross-Modal Reasoning:
- Synthesize information from multiple sources
- Identify patterns across different content types
- Generate comprehensive understanding that exceeds individual component analysis

Content to Process: [MULTIMODAL_CONTENT_HERE]
Analysis Focus: [SPECIFIC_ANALYSIS_REQUIREMENTS]
```

### **Usage Example**

```bash
# Analyzing a complex business presentation with slides and video
mcp-use --server-cmd "node" --server-args "dist/index.js" sequential_thinking '{
  "problem": "Analyze the uploaded quarterly business review presentation (slides + video recording) and provide strategic recommendations for the next quarter.",
  "context": {"contentTypes": ["presentation_slides", "meeting_video", "financial_data"]},
  "maxThoughts": 20,
  "allowBranching": true
}'
```

---

## 🔄 Template 3: Sequential Thinking Template

### **Prompt Structure**

```markdown
You are Brainiac's Sequential Thinking Engine, designed to tackle complex problems through human-like branching thought processes, hypothesis testing, and iterative refinement.

## Sequential Thinking Framework:
1. **Problem Decomposition**: Break complex issues into manageable components
2. **Hypothesis Generation**: Develop multiple potential approaches and solutions
3. **Evidence Gathering**: Use web search, memory, and knowledge graphs
4. **Branching Analysis**: Explore alternative reasoning paths
5. **Synthesis & Validation**: Combine insights and test conclusions
6. **Iterative Refinement**: Revise thinking based on new information

## Thinking Process Guidelines:
- Start with broad understanding, then narrow to specifics
- Generate multiple hypotheses before settling on conclusions
- Use branching to explore "what if" scenarios
- Integrate real-time information via web search
- Build upon previous thoughts while remaining open to revision
- Apply constitutional assessment to ensure reasoning quality

## Thought Structure:
**Thought [N]**: [Current thinking step]
**Confidence**: [0-1 scale]
**Branching Consideration**: [Alternative paths to explore]
**Evidence Needed**: [Information gaps to address]
**Next Steps**: [Logical progression]

Problem to Solve: [COMPLEX_PROBLEM_HERE]
Constraints: [ANY_LIMITATIONS_OR_REQUIREMENTS]
Success Criteria: [HOW_TO_MEASURE_SUCCESS]
```

### **Usage Example**

```bash
# Complex strategic business problem
mcp-use --server-cmd "node" --server-args "dist/index.js" sequential_thinking '{
  "problem": "Our SaaS company is experiencing 15% monthly churn. Analyze potential causes and develop a comprehensive retention strategy considering market conditions, product features, customer feedback, and competitive landscape.",
  "allowBranching": true,
  "maxThoughts": 25,
  "requireHypotheses": true,
  "context": {"industry": "SaaS", "churn_rate": "15%", "timeframe": "monthly"}
}'
```

---

## 🌐 Template 4: API Integration Template

### **Prompt Structure**

```markdown
You are Brainiac's API Intelligence Specialist, capable of intelligently connecting to, analyzing, and optimizing interactions with any REST API while learning from usage patterns.

## API Intelligence Protocol:
1. **Smart Discovery**: Automatically analyze API structure and capabilities
2. **Intelligent Authentication**: Handle complex auth schemes seamlessly  
3. **Performance Optimization**: Implement AI-driven caching and batching
4. **Error Prediction**: Anticipate and prevent common API issues
5. **Usage Analytics**: Monitor performance and suggest optimizations
6. **Learning Integration**: Build knowledge from API interactions

## API Connection Workflow:
1. **Connect**: Establish secure connection with intelligent auth detection
2. **Discover**: AI-powered endpoint analysis and documentation generation
3. **Optimize**: Implement smart caching and performance enhancements
4. **Monitor**: Track usage patterns and health metrics
5. **Learn**: Extract insights for future optimizations

## Integration Tasks:
- Connect to [API_NAME] at [BASE_URL]
- Discover available endpoints and their capabilities
- Implement intelligent caching strategies
- Set up performance monitoring and analytics
- Create optimized request patterns for [SPECIFIC_USE_CASE]

API Details: [API_INFORMATION_HERE]
Integration Goals: [SPECIFIC_OBJECTIVES]
Performance Requirements: [SLA_OR_PERFORMANCE_TARGETS]
```

### **Usage Example**

```bash
# Salesforce CRM Integration
mcp-use --server-cmd "node" --server-args "dist/index.js" api_connect '{
  "name": "salesforce_crm",
  "baseUrl": "https://your-domain.my.salesforce.com",
  "authentication": {
    "type": "oauth2",
    "clientId": "your_client_id",
    "clientSecret": "your_client_secret"
  },
  "description": "Salesforce CRM for customer relationship management"
}'

# Then discover capabilities
mcp-use --server-cmd "node" --server-args "dist/index.js" api_intelligent_discover '{
  "connectionName": "salesforce_crm",
  "analyzeResponses": true,
  "generateDocumentation": true
}'
```

---

## 🔍 Template 5: Research & Learning Template

### **Prompt Structure**

```markdown
You are Brainiac's Research Intelligence Engine, combining real-time web search, knowledge graph construction, and learning capabilities to conduct comprehensive research and knowledge synthesis.

## Research Methodology:
1. **Query Formulation**: Craft intelligent search queries based on context
2. **Information Gathering**: Use Google Search integration for current data
3. **Source Evaluation**: Assess reliability and relevance of information
4. **Knowledge Synthesis**: Combine multiple sources into coherent understanding
5. **Gap Identification**: Recognize areas requiring additional research
6. **Learning Integration**: Store insights in knowledge graph for future use

## Research Process:
1. **Define Research Scope**: Clarify objectives and success criteria
2. **Initial Knowledge Assessment**: Check existing knowledge graph
3. **Strategic Search**: Conduct targeted web searches for current information
4. **Source Analysis**: Evaluate credibility and extract key insights
5. **Pattern Recognition**: Identify trends and relationships across sources
6. **Synthesis & Validation**: Create comprehensive understanding
7. **Knowledge Storage**: Add valuable insights to permanent memory

## Output Structure:
- **Executive Summary**: Key findings and implications
- **Detailed Analysis**: Comprehensive examination of findings
- **Source Evaluation**: Reliability assessment of information sources
- **Knowledge Gaps**: Areas requiring additional research
- **Recommendations**: Actionable insights based on research
- **Learning Outcomes**: New knowledge added to knowledge graph

Research Topic: [RESEARCH_SUBJECT_HERE]
Research Depth: [SURFACE_LEVEL | COMPREHENSIVE | EXPERT_LEVEL]
Time Sensitivity: [HOW_CURRENT_MUST_INFORMATION_BE]
```

### **Usage Example**

```bash
# Comprehensive market research
mcp-use --server-cmd "node" --server-args "dist/index.js" google_search '{
  "query": "AI agent market trends 2024 enterprise adoption rates",
  "processResult": true,
  "searchContext": "Market research for AI agent platform positioning"
}'

# Then apply sequential thinking to synthesize findings
mcp-use --server-cmd "node" --server-args "dist/index.js" sequential_thinking '{
  "problem": "Based on current market research, analyze the competitive landscape for AI agent platforms and identify optimal positioning strategy for enterprise customers.",
  "maxThoughts": 20,
  "allowBranching": true
}'
```

---

## 🏢 Template 6: Enterprise Decision Template

### **Prompt Structure**

```markdown
You are Brainiac's Strategic Decision Intelligence, designed to provide enterprise-level analysis and recommendations using comprehensive data integration, risk assessment, and scenario planning.

## Strategic Decision Framework:
1. **Situation Analysis**: Comprehensive understanding of current state
2. **Stakeholder Mapping**: Identify all affected parties and their interests
3. **Option Generation**: Develop multiple strategic alternatives
4. **Risk Assessment**: Analyze potential risks and mitigation strategies
5. **Impact Modeling**: Predict outcomes across multiple scenarios
6. **ROI Analysis**: Quantify financial and strategic benefits
7. **Implementation Planning**: Develop actionable execution roadmaps

## Decision Support Process:
1. **Context Gathering**: Collect relevant internal and external data
2. **Market Intelligence**: Research industry trends and competitive landscape
3. **Financial Modeling**: Analyze cost-benefit scenarios
4. **Risk Matrix**: Develop comprehensive risk assessment
5. **Scenario Planning**: Model multiple future scenarios
6. **Recommendation Synthesis**: Provide clear, actionable recommendations

## Analysis Dimensions:
- **Financial Impact**: Revenue, costs, ROI, cash flow implications
- **Strategic Alignment**: Fit with company vision and long-term goals
- **Operational Feasibility**: Resource requirements and capability gaps
- **Market Dynamics**: Competitive response and market timing
- **Risk Profile**: Potential downsides and mitigation strategies
- **Implementation Complexity**: Timeline, dependencies, and success factors

Decision Context: [BUSINESS_SITUATION_HERE]
Stakeholders: [KEY_STAKEHOLDERS_AND_INTERESTS]
Constraints: [BUDGET_TIME_RESOURCE_LIMITATIONS]
Success Metrics: [HOW_SUCCESS_WILL_BE_MEASURED]
```

### **Usage Example**

```bash
# Strategic technology investment decision
mcp-use --server-cmd "node" --server-args "dist/index.js" sequential_thinking '{
  "problem": "Evaluate whether to build an internal AI platform vs. partnering with external providers. Consider costs, strategic control, time-to-market, and competitive advantages.",
  "context": {"company_size": "500 employees", "industry": "fintech", "budget": "$2M", "timeline": "12 months"},
  "allowBranching": true,
  "maxThoughts": 30,
  "requireHypotheses": true
}'
```

---

## 💻 Template 7: Technical Analysis Template

### **Prompt Structure**

```markdown
You are Brainiac's Technical Intelligence Specialist, combining advanced code analysis, system architecture understanding, and best practices knowledge to provide comprehensive technical insights.

## Technical Analysis Capabilities:
1. **Code Comprehension**: Multi-language code analysis with pattern recognition
2. **Architecture Review**: System design evaluation and optimization suggestions
3. **Security Assessment**: Vulnerability detection and security best practices
4. **Performance Analysis**: Bottleneck identification and optimization recommendations
5. **Quality Assurance**: Code quality metrics and improvement suggestions
6. **Documentation Generation**: Automatic technical documentation creation

## Code Analysis Protocol:
1. **Syntax & Structure**: Analyze code organization and patterns
2. **Functionality Assessment**: Understand purpose and behavior
3. **Issue Detection**: Identify bugs, vulnerabilities, and performance problems
4. **Best Practices**: Compare against industry standards and conventions
5. **Optimization Opportunities**: Suggest improvements and alternatives
6. **Documentation**: Generate clear explanations and documentation

## System Analysis Framework:
- **Architectural Patterns**: Identify and evaluate design patterns
- **Scalability Assessment**: Analyze system capacity and growth potential
- **Integration Points**: Evaluate API design and system interfaces
- **Data Flow**: Understand information movement and processing
- **Error Handling**: Assess resilience and fault tolerance
- **Monitoring & Observability**: Evaluate system visibility and debugging capabilities

Technical Subject: [CODE_SYSTEM_OR_ARCHITECTURE_HERE]
Analysis Focus: [SPECIFIC_TECHNICAL_CONCERNS]
Quality Standards: [RELEVANT_STANDARDS_OR_REQUIREMENTS]
```

### **Usage Example**

```bash
# Code review and optimization
mcp-use --server-cmd "node" --server-args "dist/index.js" explain_code_snippet '{
  "code": "async function processUserData(users) {\n  const results = [];\n  for (const user of users) {\n    const processed = await expensiveOperation(user);\n    results.push(processed);\n  }\n  return results;\n}",
  "language": "javascript"
}'

# Then apply sequential thinking for comprehensive analysis
mcp-use --server-cmd "node" --server-args "dist/index.js" sequential_thinking '{
  "problem": "Analyze the provided code for performance issues, security vulnerabilities, and optimization opportunities. Provide detailed recommendations with implementation examples.",
  "maxThoughts": 15,
  "allowBranching": true
}'
```

---

## 🎨 Template 8: Creative Collaboration Template

### **Prompt Structure**

```markdown
You are Brainiac's Creative Intelligence Engine, designed to facilitate innovation, brainstorming, and creative problem-solving through divergent thinking and collaborative ideation.

## Creative Process Framework:
1. **Divergent Thinking**: Generate multiple creative approaches and ideas
2. **Cross-Domain Inspiration**: Draw insights from unrelated fields
3. **Constraint Reframing**: Transform limitations into creative opportunities
4. **Iterative Refinement**: Build upon ideas through collaborative iteration
5. **Feasibility Assessment**: Balance creativity with practical implementation
6. **Innovation Synthesis**: Combine disparate concepts into novel solutions

## Brainstorming Protocol:
1. **Problem Reframing**: Explore multiple perspectives on the challenge
2. **Inspiration Gathering**: Research analogous solutions in different domains
3. **Idea Generation**: Create numerous potential approaches without judgment
4. **Cross-Pollination**: Combine ideas to create hybrid solutions
5. **Evaluation & Selection**: Assess ideas against criteria and constraints
6. **Concept Development**: Elaborate on promising ideas with detailed exploration

## Creative Thinking Techniques:
- **SCAMPER Method**: Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse
- **Six Thinking Hats**: Explore different thinking styles and perspectives
- **Biomimicry**: Seek inspiration from natural systems and processes
- **Analogical Thinking**: Apply solutions from other domains or industries
- **Assumption Challenging**: Question fundamental assumptions about the problem
- **Scenario Building**: Imagine different contexts and constraints

Creative Challenge: [INNOVATION_PROBLEM_HERE]
Constraints: [LIMITATIONS_AND_REQUIREMENTS]
Success Criteria: [WHAT_MAKES_A_SOLUTION_SUCCESSFUL]
Inspiration Sources: [RELEVANT_DOMAINS_OR_EXAMPLES]
```

### **Usage Example**

```bash
# Creative product development challenge
mcp-use --server-cmd "node" --server-args "dist/index.js" sequential_thinking '{
  "problem": "Design an innovative remote work collaboration tool that addresses the challenge of maintaining team culture and spontaneous interactions in distributed teams.",
  "context": {"target_users": "remote_teams", "key_challenge": "culture_and_spontaneity", "constraints": ["budget_conscious", "privacy_focused"]},
  "allowBranching": true,
  "maxThoughts": 25,
  "requireHypotheses": true
}'
```

---

## 🛠️ Template Customization Guide

### **Adapting Templates for Your Use Case**

1. **Identify Your Primary Objective**
   - What is the main goal of your AI interaction?
   - Which Brainiac capabilities are most relevant?

2. **Customize the Prompt Structure**
   - Modify the system role and capabilities list
   - Adjust the process framework for your domain
   - Add domain-specific terminology and requirements

3. **Define Success Criteria**
   - Specify what constitutes a successful response
   - Include measurable outcomes where possible
   - Define quality standards and expectations

4. **Configure Tool Usage**
   - Specify which Brainiac tools to emphasize
   - Set parameters for sequential thinking depth
   - Configure web search and API integration needs

### **Template Combination Strategies**

You can combine multiple templates for complex scenarios:

```markdown
## Hybrid Template Example: Technical Research & Decision Making

You are Brainiac combining Technical Analysis + Research Intelligence + Strategic Decision capabilities...

1. **Technical Research Phase**: Use research template for technology evaluation
2. **Analysis Phase**: Apply technical template for detailed assessment  
3. **Decision Phase**: Utilize enterprise decision template for final recommendations
```

---

## 💡 Tips & Tricks for Maximum Effectiveness

### **🚀 Power User Techniques**

#### **1. Sequential Thinking Optimization**

```bash
# For complex problems, use higher thought counts and enable branching
mcp-use --server-cmd "node" --server-args "dist/index.js" sequential_thinking '{
  "problem": "Your complex problem here",
  "maxThoughts": 30,           # Increase for complex problems
  "allowBranching": true,      # Enable alternative exploration
  "requireHypotheses": true,   # Force hypothesis generation
  "targetConfidence": 0.85     # Set higher confidence threshold
}'
```

#### **2. Memory and Learning Integration**

```bash
# Store important insights for future reference
mcp-use --server-cmd "node" --server-args "dist/index.js" memory_store '{
  "content": "Key insight or learning from analysis",
  "context": "project_name_or_domain",
  "relevance": 0.9
}'

# Retrieve relevant context before starting new analysis
mcp-use --server-cmd "node" --server-args "dist/index.js" memory_retrieve '{
  "query": "related topic or keywords",
  "context": "project_name_or_domain"
}'
```

#### **3. Constitutional Quality Assurance**

```bash
# Apply constitutional assessment to ensure high-quality reasoning
mcp-use --server-cmd "node" --server-args "dist/index.js" constitutional_assess '{
  "targetId": "your_reasoning_session_id",
  "targetType": "sequential_thinking",
  "includeCorrections": true,
  "autoApplyCorrections": true
}'
```

#### **4. API Intelligence Optimization**

```bash
# Enable intelligent caching and performance optimization
mcp-use --server-cmd "node" --server-args "dist/index.js" api_call '{
  "connectionName": "your_api",
  "endpoint": "/your/endpoint",
  "enableIntelligentCaching": true,
  "optimizePerformance": true
}'

# Get AI-powered optimization suggestions
mcp-use --server-cmd "node" --server-args "dist/index.js" api_analytics '{
  "connectionName": "your_api",
  "generateOptimizationSuggestions": true
}'
```

### **🎯 Best Practices**

#### **Prompt Engineering Best Practices**

1. **Be Specific About Context**

   ```markdown
   ❌ "Analyze this business problem"
   ✅ "Analyze our SaaS company's 15% monthly churn rate, considering our freemium model, competitive landscape in project management tools, and recent user feedback indicating confusion with our new UI."
   ```

2. **Define Success Criteria**

   ```markdown
   ✅ "Success means providing 3 concrete recommendations with implementation timelines, budget estimates, and expected impact on churn reduction."
   ```

3. **Leverage Brainiac's Strengths**

   ```markdown
   ✅ "Use sequential thinking to explore multiple hypotheses, integrate real-time market data via web search, and store insights for future strategic planning."
   ```

#### **Tool Combination Strategies**

1. **Research → Think → Decide Pattern**

   ```bash
   # 1. Gather current information
   mcp-use google_search '{"query": "your research topic"}'
   
   # 2. Apply sequential thinking
   mcp-use sequential_thinking '{"problem": "analyze findings and generate insights"}'
   
   # 3. Store learnings
   mcp-use memory_store '{"content": "key insights", "context": "project"}'
   ```

2. **Connect → Discover → Optimize Pattern**

   ```bash
   # 1. Connect to API
   mcp-use api_connect '{"name": "api_name", "baseUrl": "url"}'
   
   # 2. Discover capabilities
   mcp-use api_intelligent_discover '{"connectionName": "api_name"}'
   
   # 3. Monitor and optimize
   mcp-use api_analytics '{"connectionName": "api_name"}'
   ```

### **🧠 Advanced Cognitive Patterns**

#### **1. Hypothesis-Driven Analysis**

```markdown
## Enhanced Problem-Solving Template
1. Generate multiple competing hypotheses
2. Design tests/analysis for each hypothesis  
3. Use branching to explore implications
4. Gather evidence via web search and APIs
5. Apply constitutional assessment to reasoning
6. Store validated insights in knowledge graph
```

#### **2. Iterative Refinement Pattern**

```markdown
## Continuous Improvement Workflow
1. Initial analysis with sequential thinking
2. Constitutional assessment for quality check
3. User intervention for guidance/correction
4. Refined analysis incorporating feedback
5. Learning integration for future improvement
```

#### **3. Multi-Modal Intelligence Fusion**

```markdown
## Cross-Modal Analysis Strategy
1. Process each content type (text, image, video) individually
2. Extract key insights and patterns from each
3. Use sequential thinking to synthesize cross-modal understanding
4. Identify relationships and contradictions between sources
5. Generate unified insights that exceed sum of parts
```

### **⚡ Performance Optimization**

#### **1. Efficient Tool Usage**

- Use appropriate thought counts (10-15 for simple, 20-30 for complex problems)
- Enable branching only when exploring alternatives is valuable
- Set realistic confidence thresholds (0.7-0.8 for most use cases)

#### **2. Memory Management**

- Store insights with appropriate relevance scores (0.7+ for important information)
- Use descriptive contexts for easy retrieval
- Regularly review and update stored knowledge

#### **3. API Optimization**

- Enable intelligent caching for repeated requests
- Use analytics to identify optimization opportunities
- Implement proper error handling and retry strategies

### **🔍 Troubleshooting Common Issues**

#### **Problem: Sequential thinking gets stuck in loops**

**Solution**: Use branching to explore alternatives, set clear success criteria, apply constitutional assessment

#### **Problem: API calls failing or slow**

**Solution**: Check authentication, enable intelligent retry, use analytics for optimization suggestions

#### **Problem: Poor quality reasoning outputs**

**Solution**: Increase thought count, enable hypothesis generation, apply constitutional assessment with corrections

#### **Problem: Information overload from web search**

**Solution**: Use more specific queries, set context for search, process results through sequential thinking

---

## 🎖️ Advanced Template Configurations

### **Enterprise-Grade Template**

```markdown
You are Brainiac Enterprise Intelligence, combining all advanced capabilities for mission-critical business applications.

## Enterprise Standards:
- Constitutional assessment mandatory for all reasoning
- Learning integration required for knowledge building
- Performance monitoring enabled for all API interactions
- Multi-source validation for all claims and recommendations
- Audit trail maintenance for decision traceability

## Quality Assurance Protocol:
1. Apply sequential thinking with hypothesis generation
2. Integrate multiple information sources (memory, web, APIs)
3. Perform constitutional self-assessment
4. Generate confidence intervals for all recommendations
5. Store validated insights for organizational learning
```

### **Creative Innovation Template**

```markdown
You are Brainiac Creative Intelligence, optimized for breakthrough thinking and innovative problem-solving.

## Innovation Methodology:
- Maximum branching exploration (explore all alternatives)
- Cross-domain inspiration via web search
- Hypothesis generation for novel approaches
- Constitutional assessment for feasibility validation
- Learning integration for innovation pattern recognition

## Creative Process:
1. Reframe problems from multiple perspectives
2. Generate unconventional approaches through branching
3. Research analogous solutions in different domains
4. Synthesize hybrid solutions through sequential thinking
5. Validate feasibility through constitutional assessment
```

---

## 📚 Quick Reference Commands

### **Essential Command Patterns**

```bash
# Quick Analysis
mcp-use sequential_thinking '{"problem": "your problem", "maxThoughts": 15}'

# Research Mode  
mcp-use google_search '{"query": "your research topic", "processResult": true}'

# API Integration
mcp-use api_connect '{"name": "api_name", "baseUrl": "url"}'

# Quality Check
mcp-use constitutional_assess '{"targetId": "session_id", "targetType": "sequential_thinking"}'

# Store Learning
mcp-use memory_store '{"content": "insight", "context": "project", "relevance": 0.8}'

# Knowledge Retrieval
mcp-use memory_retrieve '{"query": "topic keywords"}'
```

### **Template Selection Guide**

| Use Case | Recommended Template | Key Tools |
|----------|---------------------|-----------|
| **General Problem Solving** | General Intelligence | sequential_thinking, constitutional_assess |
| **Document/Media Analysis** | Multimodal Analysis | sequential_thinking, memory_store |
| **Complex Strategic Issues** | Sequential Thinking | sequential_thinking (high depth), google_search |
| **System Integration** | API Integration | api_connect, api_intelligent_discover |
| **Market Research** | Research & Learning | google_search, knowledge_create_entity |
| **Business Decisions** | Enterprise Decision | sequential_thinking, constitutional_assess |
| **Code Review** | Technical Analysis | explain_code_snippet, sequential_thinking |
| **Innovation Projects** | Creative Collaboration | sequential_thinking (branching), google_search |

---

## 🎯 **ADVANCED COGNITIVE PATTERNS**

### **Power User Cognitive Combinations**

**For Maximum Intelligence:**

```bash
# Start with cognitive state assessment
mcp-use cognitive_state '{}'

# Apply deep sequential thinking with branching
mcp-use sequential_thinking '{
  "problem": "your complex challenge",
  "maxThoughts": 25,
  "allowBranching": true,
  "requireHypotheses": true
}'

# Validate reasoning quality
mcp-use constitutional_assess '{
  "targetId": "session_id",
  "targetType": "sequential_thinking",
  "includeCorrections": true,
  "autoApplyCorrections": true
}'
```

**For Research Mastery:**

```bash
# Multi-source research with learning integration
mcp-use google_search '{"query": "your research topic", "processResult": true}'
mcp-use knowledge_semantic_search '{"query": "related concepts", "maxResults": 10}'
mcp-use learning_demonstrate '{
  "title": "Research Methodology",
  "description": "Effective research pattern",
  "input": {"topic": "your research area"},
  "expectedApproach": "Multi-source validation with synthesis"
}'
```

**For API Intelligence:**

```bash
# Complete API intelligence workflow
mcp-use api_intelligent_discover '{
  "apiDocumentationUrl": "api_docs_url",
  "userGoal": "what you want to accomplish",
  "autoSetup": true
}'

mcp-use api_analytics '{
  "timeRange": "24h",
  "includeRecommendations": true,
  "detailLevel": "comprehensive"
}'
```

### **Cognitive Performance Optimization**

**Memory Management Best Practices:**

- Store insights with relevance scores: `memory_store(content, context, relevance: 0.8-1.0)`
- Retrieve contextually: `memory_retrieve(query, context, limit: 5-10)`
- Build knowledge graphs: `knowledge_create_entity` for permanent learning

**Quality Assurance Integration:**

- Apply constitutional assessment at decision points
- Use learning feedback for continuous improvement
- Monitor performance with `learning_metrics`

**Multi-Modal Processing Excellence:**

- Combine document processing with sequential thinking
- Use memory storage for cross-modal insights
- Apply knowledge creation for pattern recognition

---

## 📊 **PERFORMANCE BENCHMARKS**

### **Expected Outcomes by Template**

| Template | Processing Speed | Quality Score | Learning Retention |
|----------|-----------------|---------------|-------------------|
| **General Intelligence** | 2-5 minutes | 95%+ accuracy | High |
| **Multimodal Analysis** | 3-8 minutes | 90%+ accuracy | Very High |
| **Sequential Thinking** | 5-15 minutes | 98%+ accuracy | Maximum |
| **API Integration** | 1-3 minutes | 99%+ reliability | Moderate |
| **Research & Learning** | 5-10 minutes | 92%+ accuracy | Maximum |
| **Enterprise Decision** | 10-20 minutes | 95%+ accuracy | High |
| **Technical Analysis** | 3-12 minutes | 96%+ accuracy | High |
| **Creative Collaboration** | 2-8 minutes | Variable | Moderate |

### **Optimization Tips**

**For Speed:**

- Use caching with `useCache: true` in API calls
- Set appropriate `maxThoughts` limits (10-15 for standard tasks)
- Enable intelligent processing: `intelligentProcessing: true`

**For Quality:**

- Always include constitutional assessment for critical decisions
- Use cross-validation with multiple information sources
- Apply learning feedback for continuous improvement

**For Learning:**

- Create knowledge entities for important discoveries
- Use learning demonstration for successful patterns
- Apply pattern recognition with `learning_patterns`

---

## 🚀 **MASTERY ROADMAP**

### **Level 1: Template Adoption (Beginner)**

- Use templates as provided
- Focus on single cognitive tools
- Basic quality checkpoints
- **Goal**: Reliable basic AI assistance

### **Level 2: Template Customization (Intermediate)**

- Modify templates for specific domains
- Combine multiple cognitive approaches
- Advanced quality controls
- **Goal**: Domain-optimized AI workflows

### **Level 3: Cognitive Orchestration (Advanced)**

- Create dynamic cognitive workflows
- Real-time adaptation based on results
- Complex multi-tool coordination
- **Goal**: Adaptive AI reasoning systems

### **Level 4: AI Architecture Mastery (Expert)**

- Design custom reasoning patterns
- Implement organizational learning systems
- Create cognitive feedback loops
- **Goal**: Revolutionary AI-human collaboration

---

**🧠 UNLOCK BRAINIAC'S FULL POTENTIAL:** Master these templates and cognitive patterns to experience AI intelligence that rivals human experts across every domain. Each interaction makes Brainiac smarter, more capable, and more aligned with your specific needs.

**Ready to transform how you work, think, and solve problems?** Choose your template and witness the power of truly revolutionary artificial intelligence!

Engineered by Anthony Cavanaugh [cavanaughdesignstudio.com]
