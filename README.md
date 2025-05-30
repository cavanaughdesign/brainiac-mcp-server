# brainiac-mcp-server
# Brainiac MCP Server

The Brainiac MCP Server is a sophisticated cognitive computing engine that leverages the Model Context Protocol (MCP) to deliver human-like reasoning capabilities. It combines advanced natural language processing, dynamic memory management, and adaptive learning to provide an extensible platform for complex problem-solving and knowledge synthesis.

Key capabilities include:

- Progressive reasoning chains with multi-step cognitive processing
- Contextual understanding through a semantic knowledge graph
- Advanced working memory system with relevance-based retention
- Self-improving algorithms through continuous learning feedback loops
- Constitutional AI principles ensuring reliable and ethical reasoning
- Seamless integration with MCP-compatible tools and clients

The server excels at tasks requiring deep analysis, pattern recognition, and strategic thinking - from technical troubleshooting to creative problem-solving. Its modular architecture allows for continuous capability expansion while maintaining robust performance and reliability.

## Features

- **Advanced Reasoning Engine**: Multi-step cognitive processing including analysis, synthesis, and evaluation.
- **Dynamic Sequential Thinking**: Supports branching thought processes, hypothesis testing, and revision.
- **ReAct (Reason-Act) Cycles**: Enables metacognitive loops of thought, action, and observation for complex problem-solving.
- **Knowledge Graph Memory**: Sophisticated storage for entities and relations with semantic search capabilities.
- **Constitutional Self-Critique**: Implements self-evaluation and correction mechanisms based on defined reasoning principles.
- **Sophisticated Learning & Adaptation Engine**: Facilitates continuous improvement from user feedback, examples, and performance analysis, enabling the server to evolve and enhance its reasoning strategies over time. (Enhanced description)
- **Working Memory**: Dynamic memory management with relevance-based retention.
- **Cognitive State Tracking**: Real-time monitoring of processing load and attention.
- **MCP Protocol Compliance**: Full compatibility with MCP clients and tools.
- **Context-Aware Processing**: Intelligent use of working memory for enhanced reasoning.

## Getting Started

### Prerequisites

- Node.js (version 18.0.0 or higher)
- npm (Node Package Manager, typically comes with Node.js)
- An MCP-compatible client (e.g., Claude Desktop, a custom MCP Client)

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd brainiac-mcp-server
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Build the TypeScript code:

    ```bash
    npm run build
    ```

### Running the Server

To start the MCP server:

```bash
npm start
```

For development with auto-rebuild on file changes:

```bash
npm run watch
```

(You'll need to run `npm start` or `node dist/index.js` in a separate terminal to start the server after `npm run watch` rebuilds.)

Or, to build and run in one command for development:

```bash
npm run dev
```

## MCP Tools

The Brainiac MCP Server provides the following tools:

### `reason`

Performs complex multi-step reasoning on queries with working memory integration.
**Parameters:**

- `query` (required): The question or problem to reason about
- `context` (optional): Additional context object
- `constraints` (optional): Array of reasoning constraints
- `maxSteps` (optional): Maximum reasoning steps
- `useWorkingMemory` (optional): Whether to utilize working memory
**Example:**

```json
{
  "query": "What are the implications of artificial intelligence on future employment?",
  "useWorkingMemory": true,
  "maxSteps": 5
}
```

### `memory_store`

Stores information in the working memory system.
**Parameters:**

- `content` (required): Content to store
- `context` (required): Memory context/category
- `relevance` (optional): Relevance score (0-1)
**Example:**

```json
{
  "content": "AI automation may displace certain jobs but create new opportunities",
  "context": "employment_analysis",
  "relevance": 0.8
}
```

### `memory_retrieve`

Retrieves information from working memory based on queries.
**Parameters:**

- `query` (required): Search query
- `context` (optional): Context filter
- `limit` (optional): Maximum items to return
**Example:**

```json
{
  "query": "employment",
  "context": "employment_analysis",
  "limit": 3
}
```

### `cognitive_state`

Returns the current cognitive state including working memory and active processes.
**Parameters:** None

### `knowledge_create_entity`

Creates a new entity in the knowledge graph.
**Parameters:**

- `name` (required): Name of the entity
- `type` (required): Type of the entity
- `observations` (optional): Array of observations about the entity
- `metadata` (optional): Additional metadata object
**Example:**

```json
{
  "name": "Machine Learning",
  "type": "technology",
  "observations": ["Used for pattern recognition", "Requires large datasets"]
}
```

### `knowledge_create_relation`

Creates a new relation between two entities in the knowledge graph.
**Parameters:**

- `from` (required): Name of the source entity
- `to` (required): Name of the target entity
- `type` (required): Type of the relation
- `strength` (optional): Strength of the relation (0-1)
- `metadata` (optional): Additional metadata object
**Example:**

```json
{
  "from": "Machine Learning",
  "to": "Neural Networks",
  "type": "uses_technique",
  "strength": 0.9
}
```

### `knowledge_semantic_search`

Performs a semantic search on the knowledge graph.
**Parameters:**

- `query` (required): Search query
- `entityTypes` (optional): Array of entity types to filter by
- `relationTypes` (optional): Array of relation types to filter by
- `maxResults` (optional): Maximum results to return
- `minRelevance` (optional): Minimum relevance score (0-1)
**Example:**

```json
{
  "query": "technologies related to data analysis",
  "maxResults": 5
}
```

### `sequential_thinking`

Initiates a dynamic sequential thinking process.
**Parameters:**

- `problem` (required): The problem statement or question.
- `context` (optional): Record of contextual information.
- `initialThoughts` (optional): Array of initial thoughts to seed the process.
- `maxThoughts` (optional): Maximum number of thoughts to generate.
- `allowBranching` (optional): Boolean, whether to allow thought branching.
- `requireHypotheses` (optional): Boolean, whether hypotheses must be generated.
- `targetConfidence` (optional): Target confidence level for the final answer.
**Example:**

```json
{
  "problem": "Evaluate the impact of remote work on team productivity.",
  "context": { "companySize": "large", "industry": "tech" },
  "maxThoughts": 20,
  "allowBranching": true
}
```

### `react_start_session`

Starts a new ReAct (Reason-Act) session.
**Parameters:**

- `goal` (required): The overall goal of the ReAct session.
- `initialPlan` (optional): Array of initial actions for the plan.
- `maxCycles` (optional): Maximum number of ReAct cycles.
**Example:**

```json
{
  "goal": "Develop a marketing strategy for a new product.",
  "initialPlan": ["Research target audience", "Analyze competitors"],
  "maxCycles": 10
}
```

### `react_execute_action`

Executes an action within an active ReAct session.
**Parameters:**

- `sessionId` (required): ID of the active ReAct session.
- `actionName` (required): Name of the action to execute.
- `actionParams` (optional): Parameters for the action.
**Example:**

```json
{
  "sessionId": "react_session_123",
  "actionName": "search_knowledge_graph",
  "actionParams": { "query": "marketing strategies for tech products" }
}
```

### `react_reflect`

Initiates a reflection phase within an active ReAct session.
**Parameters:**

- `sessionId` (required): ID of the active ReAct session.
- `reflection` (required): User-provided reflection on the session's progress.
- `strategicAdjustments` (optional): Array of proposed strategic adjustments.
**Example:**

```json
{
  "sessionId": "react_session_123",
  "reflection": "The initial research is too broad. Need to narrow down the target audience.",
  "strategicAdjustments": ["Refine target audience criteria", "Focus on social media channels"]
}
```

### `constitutional_assess`

Performs a constitutional assessment of reasoning quality for a target.
**Parameters:**

- `targetId` (optional): ID of the target to assess (e.g., reasoning chain ID).
- `targetType` (optional): Type of target ('reasoning_chain', 'sequential_thinking', 'react_cycle').
- `frameworkId` (optional): ID of the constitutional framework to use.
- `includeCorrections` (optional): Boolean, whether to include correction suggestions.
- `autoApplyCorrections` (optional): Boolean, whether to attempt to auto-apply corrections.
**Example:**

```json
{
  "targetId": "reasoning_chain_456",
  "targetType": "reasoning_chain",
  "includeCorrections": true
}
```

### `constitutional_critique`

Starts a comprehensive critique session for continuous improvement.
**Parameters:**

- `goal` (required): Goal of the critique session.
- `targetIds` (optional): Array of target IDs to include.
- `timeframe` (optional): Object with `start` and `end` timestamps for metrics analysis.
**Example:**

```json
{
  "goal": "Improve clarity in reasoning outputs over the next month.",
  "targetIds": ["reasoning_chain_456", "sequential_thinking_789"]
}
```

### `constitutional_metrics`

Retrieves quality metrics based on constitutional assessments.
**Parameters:**

- `timeframe` (optional): Object with `start` and `end` timestamps.
- `metricTypes` (optional): Array of specific metric types to retrieve.
**Example:**

```json
{
  "timeframe": { "start": 1672531200000, "end": 1675209600000 },
  "metricTypes": ["clarity_score", "logical_consistency"]
}
```

### `learning_feedback`

Provides feedback on a session or reasoning process.
**Parameters:**

- `sessionId` (required): ID of the session being evaluated.
- `sessionType` (required): Type of session ('reasoning_chain', 'sequential_thinking', etc.).
- `feedbackType` (required): Type of feedback ('correction', 'preference', 'rating', 'suggestion').
- `rating` (optional): Numerical rating (1-5).
- `corrections` (optional): Array of correction objects.
- `preferences` (optional): Array of preference objects.
- `suggestions` (optional): Array of improvement suggestions.
- `context` (optional): Contextual information.
**Example:**

```json
{
  "sessionId": "sequential_thinking_789",
  "sessionType": "sequential_thinking",
  "feedbackType": "rating",
  "rating": 4,
  "suggestions": ["Consider alternative viewpoints more explicitly."]
}
```

### `learning_adapt`

Triggers the learning engine to adapt based on accumulated knowledge.
**Parameters:**

- `priority` (optional): Priority of adaptation ('high', 'medium', 'low').
- `domains` (optional): Array of specific domains to focus adaptation on.
- `forceAdaptation` (optional): Boolean, whether to force adaptation even if thresholds aren't met.
**Example:**

```json
{
  "priority": "high",
  "domains": ["technical_problem_solving"]
}
```

### `learning_demonstrate`

Provides a learning example to the engine.
**Parameters:**

- `title` (required): Title of the example.
- `description` (required): Description of the example.
- `input` (required): Input for the example.
- `expectedApproach` (required): Description of the expected reasoning approach.
- `idealProcess` (required): Array of steps in the ideal reasoning process.
- `expectedOutput` (optional): The expected output.
- `qualityRating` (optional): Quality rating of this example (0-1).
- `annotations` (optional): Array of key insights.
**Example:**

```json
{
  "title": "Debugging a Null Pointer Exception",
  "description": "Demonstrates a systematic approach to debugging.",
  "input": { "codeSnippet": "...", "errorMessage": "NullPointerException" },
  "expectedApproach": "Identify the null variable, trace back its origin, and implement a null check or proper initialization.",
  "idealProcess": ["Examine stack trace", "Identify line number", "Inspect variables at that line", "Trace variable origin"]
}
```

### `learning_patterns`

Views recognized reasoning patterns and adaptation rules.
**Parameters:**

- `filterByDomain` (optional): Filter patterns by a specific domain.
- `minConfidence` (optional): Minimum confidence level for patterns.
- `includePerformance` (optional): Boolean, whether to include detailed performance data.
**Example:**

```json
{
  "filterByDomain": "technical_problem_solving",
  "minConfidence": 0.7
}
```

### `learning_metrics`

Retrieves metrics about the learning engine's performance and state.
**Parameters:**

- `timeframe` (optional): Timeframe for metrics ('hour', 'day', 'week', 'month').
- `includeBreakdown` (optional): Boolean, whether to include detailed breakdowns.
**Example:**

```json
{
  "timeframe": "week",
  "includeBreakdown": true
}
```

## MCP Resources

The server exposes the following MCP resources:

### `memory://working`

Access to current working memory contents in JSON format.

### `state://cognitive`

Complete cognitive state including processing load, attention, and active reasoning chains.

### `knowledge://graph`

Access to the current state of the knowledge graph in JSON format, including entities and relations.

## MCP Client Integration

### Claude Desktop Configuration

Add to your `claude_desktop_config.json` (or equivalent MCP client configuration):

```json
{
  "mcpServers": {
    "brainiac": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/brainiac-mcp-server"
    }
  }
}
```

Replace `/path/to/brainiac-mcp-server` with the actual path to the server's root directory.

### Generic MCP Client

Example using `@modelcontextprotocol/sdk`:

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['dist/index.js'],
  cwd: '/path/to/brainiac-mcp-server' // Adjust path
});

const client = new Client({
  name: "brainiac-client",
  version: "1.0.0"
}, {
  capabilities: {} // Define client capabilities if any
});

await client.connect(transport);

// Example: Call the 'reason' tool
// const result = await client.callTool('reason', { query: "Hello Brainiac!" });
// console.log(result);

// await client.close();
```

## Architecture

### Cognitive Processing Pipeline

1. **Analysis**: Breaking down queries and inputs into fundamental components.
2. **Retrieval**: Accessing relevant information from working memory and the knowledge graph.
3. **Synthesis**: Combining analyzed inputs with retrieved knowledge to form new insights.
4. **Reasoning**: Applying various cognitive strategies (e.g., sequential thinking, ReAct cycles).
5. **Evaluation**: Assessing reasoning quality, confidence, and constitutional alignment.
6. **Learning**: Updating internal models, patterns, and rules based on outcomes and feedback.
7. **Action (ReAct)**: Determining and simulating actions based on reasoning.
8. **Response Generation**: Formatting and outputting results.

### Working Memory Management

- **Capacity Management**: Strategies for managing memory load (though explicit cleanup of low-relevance items is not yet fully automated).
- **Relevance Scoring**: Dynamic prioritization of memory items (partially implemented).
- **Context Categorization**: Organized storage by domain/topic.
- **Temporal Decay**: Time-based relevance adjustment (not explicitly implemented, but timestamps are stored).

### Knowledge Graph

- Stores entities and their relationships.
- Supports semantic search.
- Integrated with reasoning and learning processes.

### Learning & Adaptation

Brainiac's intelligence isn't static; it's designed to learn and evolve. The Learning & Adaptation Engine is central to this, creating a dynamic feedback loop:

- **Collects Diverse Inputs**: Gathers user feedback (via [`learning_feedback`](#learning_feedback)), demonstration examples (via [`learning_demonstrate`](#learning_demonstrate)), and ongoing performance data.
- **Identifies and Refines Patterns**: Analyzes inputs to recognize effective [`ReasoningPattern`s](src/types/index.ts) and areas for improvement. This involves processes like [`processFeedbackForPatterns`](tools/brainiac-mcp-server/src/app.ts), [`updatePatternsFromCorrection`](tools/brainiac-mcp-server/src/app.ts), and [`updatePatternsFromPreferences`](tools/brainiac-mcp-server/src/app.ts).
- **Applies Intelligent Adaptations**: Uses [`AdaptationRule`s](src/types/index.ts) to proactively [`modifyStrategy`](tools/brainiac-mcp-server/src/app.ts), [`tuneParameters`](tools/brainiac-mcp-server/src/app.ts), and [`emphasizeTechniques`](tools/brainiac-mcp-server/src/app.ts) (triggered by [`learning_adapt`](#learning_adapt)).
- **Tracks Performance Metrics**: Continuously monitors key metrics (see details below) to guide the learning process and demonstrate tangible improvements. The [`handleLearningMetrics`](tools/brainiac-mcp-server/src/app.ts) tool provides access to this data.

This cyclical process ensures Brainiac becomes more effective and aligned with desired outcomes over time.

**(Consider adding the new section here, or after "Troubleshooting")**

## 🧠 Advanced Learning & Continuous Improvement

The Brainiac MCP Server distinguishes itself with a robust Learning and Adaptation Engine, enabling it to not just perform tasks, but to learn from them and continuously refine its cognitive abilities. This engine transforms Brainiac into a dynamic system that evolves over time.

### The Core Learning Loop

1. **Feedback Integration (`learning_feedback` tool):**
    Brainiac actively learns from user interactions. The [`handleLearningFeedback`](tools/brainiac-mcp-server/src/app.ts) mechanism processes various forms of feedback:
    - **Ratings:** Numerical scores on session performance.
    - **Corrections:** Specific adjustments to reasoning steps or outputs.
    - **Preferences:** Guidance on desired reasoning styles or approaches.
    - **Suggestions:** Ideas for improvement.
    This feedback directly influences pattern recognition (see [`processFeedbackForPatterns`](tools/brainiac-mcp-server/src/app.ts)) and performance metric updates (see [`updatePerformanceFromFeedback`](tools/brainiac-mcp-server/src/app.ts)).

2. **Learning from Demonstration (`learning_demonstrate` tool):**
    Users can provide ideal examples of problem-solving. The [`handleLearningDemonstrate`](tools/brainiac-mcp-server/src/app.ts) function analyzes these demonstrations to extract:
    - Effective `techniques`
    - Underlying `principles`
    - Reusable `patterns`
    This allows Brainiac to learn best practices directly.

3. **Pattern Recognition & Adaptation (`learning_patterns` & `learning_adapt` tools):**
    - Brainiac identifies and stores successful [`ReasoningPattern`s](src/types/index.ts). Users can inspect these via the [`handleLearningPatterns`](tools/brainiac-mcp-server/src/app.ts) tool.
    - The system uses [`AdaptationRule`s](src/types/index.ts) to make intelligent adjustments. The [`handleLearningAdapt`](tools/brainiac-mcp-server/src/app.ts) tool can trigger this process, leading to modifications in strategy, parameter tuning, or emphasis on specific techniques (e.g., [`emphasizeTechniques`](tools/brainiac-mcp-server/src/app.ts)).

### Monitoring Progress: Performance Metrics & Insights

Brainiac provides rich metrics to track its learning journey and demonstrate tangible improvements, accessible via the [`learning_metrics`](#learning_metrics) tool and its handler [`handleLearningMetrics`](tools/brainiac-mcp-server/src/app.ts).

**Key Metrics Tracked:**

- **Average Reasoning Quality:** Derived from constitutional assessments, showing the effectiveness of its reasoning.
- **Average User Satisfaction:** Based on feedback ratings, indicating alignment with user expectations.
- **Total Sessions & Feedback Processed:** Quantifying the experience base.
- **Patterns Recognized, Adaptations Applied, Examples Learned:** Tracking the growth of its knowledge and adaptive capabilities.
- **Improvement Rate:** A crucial metric calculated by [`calculateImprovementRate`](tools/brainiac-mcp-server/src/app.ts), often showing the daily percentage_point change in average reasoning quality.

**Visualizing Success (Conceptual):**

While the server provides raw data, these metrics are designed for visualization. Imagine a dashboard showcasing:

- **Reasoning Quality Over Time:** A line chart plotting `averageQuality` against time (daily/weekly), using data from [`generateMetricsBreakdown`](tools/brainiac-mcp-server/src/app.ts). This would visually confirm if the server's reasoning is improving.

```
    Example: Quality Trend
      ^ Quality Score
    1.0 |        __/---
    0.8 |       /
    0.6 | -----/
      +------------------> Time
    ```

* **User Satisfaction Trends:** A similar line chart for `averageSatisfaction` over time.
- **Learning Milestones:** Bar charts illustrating the growth in `patternsRecognized`, `adaptationsApplied`, and `examplesLearned`.

The `includeBreakdown: true` parameter in the `learning_metrics` tool provides the time-series data necessary for such charts.

**Actionable Insights:**

Brainiac can also provide qualitative insights into its performance via [`generatePerformanceInsights`](tools/brainiac-mcp-server/src/app.ts). This can yield human-readable summaries like:
- "High quality reasoning performance maintained."
- "Performance is improving over time."
- "User satisfaction could be improved; consider reviewing recent feedback."

This comprehensive approach to learning, adaptation, and metric tracking ensures that the Brainiac MCP Server is not just a powerful reasoning engine, but one that demonstrably gets better with experience.

## Development

### Project Structure



src/
├── app.ts              # Main MCP server implementation
├── types/index.ts      # TypeScript type definitions
└── index.ts            # Entry point for the server
package.json
tsconfig.json
README.md


### Building

To compile the TypeScript code to JavaScript:

```bash
npm run build
```

### Development Mode

To automatically rebuild on file changes during development:

```bash
npm run watch
```

(The server needs to be run separately, e.g., `npm start` or `node dist/index.js`)

To build and run with `nodemon` (if configured, or use `npm run dev`):

```bash
npm run dev
```

### Testing

Test the server with an MCP client (like the generic client example above) or use a tool like the MCP Inspector.

## Troubleshooting

### Common Issues

**Server not starting:**

- Ensure Node.js 18+ is installed.
- Check that dependencies are installed with `npm install`.
- Verify the build completed successfully with `npm run build`.

**MCP client connection issues:**

- Confirm the server path in client configuration is correct.
- Check that the server process has proper permissions to execute.
- Verify stdio transport is working correctly between client and server.

**Memory not persisting:**

- Working memory and knowledge graph data are currently in-memory and volatile (reset on server restart).
- For persistent memory, consider implementing a storage backend (e.g., a database) for the `CognitiveState`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.
