# 🧠 Brainiac MCP Server: Your AI Co-Pilot for Human-Like Reasoning

The Brainiac MCP Server isn't just another processing unit; it's a sophisticated cognitive engine designed to emulate the nuanced ways humans think, learn, and solve complex problems. Leveraging the Model Context Protocol (MCP), Brainiac offers an extensible platform that combines advanced natural language understanding, dynamic memory, adaptive learning, and principled reasoning. Step into the future of AI, where your digital partner doesn't just compute—it comprehends, innovates, and evolves.

## The Brainiac Difference: Thinking, Learning, Evolving

What sets Brainiac apart? It's our commitment to building an AI that truly augments human intellect:

* **Mimicking Human Thought:** Brainiac excels at tasks requiring deep understanding and exploration.
  * **Dynamic Sequential Thinking:** Goes beyond linear processing, allowing for branching thought processes, hypothesis testing, and reflective revision—much like a human exploring multiple angles of a complex issue.
  * **ReAct (Reason-Act) Cycles:** Engages in metacognitive loops of thought, action, and observation. This iterative process allows Brainiac to tackle multi-step problems, learn from simulated actions, and refine its approach in real-time.
* **Intelligent Learning & Adaptation:** Brainiac is a living system that grows smarter.
  * It learns from direct feedback, examples of ideal solutions (`learning_demonstrate`), and its own performance, continuously refining its strategies and knowledge.
  * The sophisticated Learning Engine identifies patterns, applies adaptation rules, and can even be guided by user interventions to accelerate its development.
* **Principled & Reliable Reasoning:** Built with Constitutional AI at its core, Brainiac includes mechanisms for self-critique and correction.
  * It assesses its reasoning against defined principles, ensuring outputs are not only intelligent but also reliable, ethical, and aligned with desired qualities like clarity and logical consistency.
* **Cognitive Agility for Complex Challenges:** From intricate technical troubleshooting to creative brainstorming and strategic planning, Brainiac is engineered to handle multifaceted problems that stump conventional algorithms.

## Core Features at a Glance

* **Deep Cognitive Processing:** Multi-step reasoning including analysis, synthesis, evaluation, and metacognition.
* **Dynamic Sequential Thinking:** Simulates human-like exploration of ideas with branching, hypothesis testing, and revision.
* **ReAct (Reason-Act) Framework:** Enables iterative problem-solving through thought-action-observation loops.
* **Evolving Knowledge Graph:** Sophisticated, dynamic memory for entities, relationships, and semantic understanding.
* **Constitutional Self-Critique & Correction:** Ensures reliable, ethical, and high-quality reasoning through self-assessment.
* **Advanced Learning & Adaptation Engine:** Continuously improves from feedback, examples, and performance analysis, evolving its strategies over time.
* **Adaptive Working Memory:** Dynamic memory management with relevance-based retention and contextual categorization.
* **Cognitive State Awareness:** Monitors processing load, attention, and the state of ongoing cognitive tasks.
* **User-Guided Cognition:** Allows for human intervention to steer, refine, or correct reasoning processes.
* **Full MCP Protocol Compliance:** Seamless integration with a wide array of MCP clients and tools.

## Dive Deeper: Advanced Cognitive Capabilities

### 🧠 Dynamic Sequential Thinking: Exploring the Landscape of Ideas

Brainiac's `sequential_thinking` tool isn't just about generating steps; it's about embarking on a cognitive journey. It can:

* Explore multiple lines of reasoning simultaneously.
* Formulate and test hypotheses.
* Identify and navigate uncertainties or contradictions.
* Revise its own thinking based on new insights or detected flaws, mirroring human critical thinking.
* Engage in "what-if" scenarios and explore counterfactuals.

This makes it incredibly powerful for tasks like research, strategic planning, debugging complex systems, and creative ideation.

### 🔄 ReAct (Reason-Act) Cycles: Iterative Problem Solving & Metacognition

The ReAct framework (`react_start_session`, `react_execute_action`, `react_reflect`) empowers Brainiac to:

* Break down daunting goals into manageable thought-action-observation cycles.
* Simulate actions and learn from their hypothetical outcomes before committing to real-world changes.
* Reflect on progress, identify roadblocks, and dynamically adjust its plan.
This is akin to how an expert tackles a novel problem: by trying something, observing the result, and then thinking about what to do next.

### 📜 Constitutional AI: Principled, Reliable, and Self-Correcting

Brainiac integrates Constitutional AI principles to ensure its reasoning is not just powerful, but also responsible and aligned with your defined standards.

* **Self-Assessment (`constitutional_assess`):** Brainiac can evaluate its own reasoning chains, sequential thinking processes, or ReAct cycles against a customizable framework of principles (e.g., for clarity, logical consistency, bias avoidance).
* **Automated & Suggested Corrections:** Based on assessments, it can identify flaws and either suggest or automatically apply corrections to its reasoning or knowledge.
* **Continuous Quality Monitoring (`constitutional_metrics`):** Track the quality of reasoning over time, providing insights into areas of strength and opportunities for improvement.

### 💡 The Learning & Adaptation Engine: Growing Smarter with Every Interaction

Brainiac's intelligence is not static. Its Learning & Adaptation Engine facilitates a continuous evolutionary loop, making the server more effective and aligned with your needs over time. This is where Brainiac truly shines, transforming from a tool into a cognitive partner.

1. **Feedback Integration (`learning_feedback` tool):**
    Brainiac actively learns from every interaction. The [`handleLearningFeedback`](tools/brainiac-mcp-server/src/app.ts) mechanism processes:
    * **Ratings:** Direct scores on session performance.
    * **Corrections:** Specific adjustments to reasoning steps, outputs, or knowledge.
    * **Preferences:** Guidance on desired reasoning styles, approaches, or ethical boundaries.
    * **Suggestions:** User-provided ideas for improvement.
    This rich feedback directly influences pattern recognition ([`processFeedbackForPatterns`](tools/brainiac-mcp-server/src/app.ts)) and updates performance metrics ([`updatePerformanceFromFeedback`](tools/brainiac-mcp-server/src/app.ts)).

2. **Learning from Demonstration (`learning_demonstrate` tool):**
    Show, don't just tell. Users can provide ideal examples of problem-solving. [`handleLearningDemonstrate`](tools/brainiac-mcp-server/src/app.ts) analyzes these demonstrations to extract:
    * Effective `techniques` and `strategies`.
    * Underlying `reasoning principles`.
    * Reusable `patterns` for future application.
    This allows Brainiac to rapidly assimilate best practices and expert knowledge.

3. **Pattern Recognition & Proactive Adaptation (`learning_patterns` & `learning_adapt` tools):**
    * Brainiac identifies, stores, and refines successful [`ReasoningPattern`s](src/types/index.ts). Users can inspect these evolving patterns via [`handleLearningPatterns`](tools/brainiac-mcp-server/src/app.ts).
    * The system utilizes [`AdaptationRule`s](src/types/index.ts) to make intelligent, proactive adjustments. The [`handleLearningAdapt`](tools/brainiac-mcp-server/src/app.ts) tool can trigger this, leading to modifications in core strategy, parameter tuning, or emphasis on specific cognitive techniques (e.g., [`emphasizeTechniques`](tools/brainiac-mcp-server/src/app.ts)).

4. **User Intervention for Guided Cognition (`user_intervention` tool - NEW!):**
    For particularly novel or complex tasks, you can now directly guide Brainiac's thought process. The `user_intervention` tool allows you to:
    * Pause and inspect an ongoing cognitive task.
    * Provide specific guidance, hints, or corrections mid-process.
    * Request alternative approaches or steer the AI away from unproductive paths.
    This collaborative approach combines human intuition with AI's processing power for superior outcomes.

### 📊 Visualizing Progress: Tangible Improvements & Performance Insights

Brainiac doesn't just claim to learn; it provides the means to track its growth and demonstrate tangible improvements. These metrics, accessible via the [`learning_metrics`](#learning_metrics) tool ([`handleLearningMetrics`](tools/brainiac-mcp-server/src/app.ts)), are designed for clarity and impact.

**Conceptual Performance Uplift:**

Imagine the impact on complex analytical tasks:

| Task Complexity        | Typical Human Time | Brainiac Initial Time | Brainiac Time (After Learning) | Accuracy Gain |
| :--------------------- | :----------------- | :-------------------- | :----------------------------- | :------------ |
| Moderate Data Analysis | 4-6 hours          | 1-2 hours             | 30-60 minutes                  | +15-20%       |
| Complex Report Gen.  | 2-3 days           | 4-8 hours             | 2-3 hours                      | +20-30%       |
| Strategic Scenario     | 1 week             | 1-2 days              | 0.5-1 day                      | Enhanced Depth|

**Conceptual Learning Curve (Reasoning Quality Over Time):**

This ASCII art represents how Brainiac's reasoning quality might improve over time with continued learning and adaptation, based on metrics like `averageQuality` from `generateMetricsBreakdown`.

```
  ^ Reasoning Quality Score
1.0 |              __/---- (Brainiac with Learning Engine)
0.9 |           __/
0.8 |        __/
0.7 |     __/
0.6 | ---/
0.5 +----------------------> Time / Number of Sessions Processed
    (Baseline Performance)
```

The `includeBreakdown: true` parameter in the `learning_metrics` tool provides the time-series data necessary for such charts.

#### The Brainiac Advantage: Measurable Growth

To illustrate the impact of Brainiac's adaptive capabilities, consider the conceptual differences in performance:

| Feature                       | System without Advanced Learning | Brainiac with Advanced Learning |
|-------------------------------|----------------------------------|---------------------------------|
| **Problem-Solving Accuracy**  | Stagnant or slow manual gains    | Continuously improves via learning |
| **Adaptation to New Tasks**   | Requires manual reconfiguration  | Adapts more autonomously         |
| **Reasoning Efficiency**      | Static, may become suboptimal    | Optimizes strategies over time  |
| **Alignment with User Needs** | Reliant on initial programming   | Evolves with feedback & examples|
| **Error Correction**          | Manual debugging                 | Self-corrects based on patterns |

This table highlights how Brainiac is designed not just to perform, but to grow and refine its abilities, offering a significant advantage over static systems.

**Actionable Insights:**

Beyond raw numbers, Brainiac can provide qualitative insights into its performance via [`generatePerformanceInsights`](tools/brainiac-mcp-server/src/app.ts), such as:

* "Consistent high-quality reasoning observed in domain X."
* "Marked improvement in addressing Y-type problems after recent feedback cycles."
* "User satisfaction trends positive; continue providing diverse examples for domain Z."

This comprehensive approach to learning, adaptation, and transparent metric tracking ensures that the Brainiac MCP Server is not just a powerful reasoning engine, but one that demonstrably gets better, more reliable, and more aligned with your goals with every interaction.

## Seamless Integration: Your Cognitive Co-Pilot Across Tools

Brainiac MCP Server is designed for broad compatibility, acting as a powerful cognitive backend for a wide array of MCP-compliant clients and development environments. Enhance your existing workflows and tools with Brainiac's advanced reasoning capabilities.

**Confirmed Compatibility With:**

* **Claude Desktop**
* **WindSurf**
* **Claude Code**
* **Cline**
* **Roo Code**
* **Cursor**
* **CoPilotKit**
* **Microsoft Copilot Studio** (via custom MCP connectors)
* **Amazon Q CLI** (via custom MCP connectors)
* ...and many more MCP-compliant tools and custom integrations!

If your tool speaks MCP, Brainiac is ready to collaborate.

## Getting Started

### Prerequisites

* Node.js (version 18.0.0 or higher)
* npm (Node Package Manager, typically comes with Node.js)
* An MCP-compatible client (e.g., Claude Desktop, a custom MCP Client)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-org/brainiac-mcp-server.git # Replace with your actual repo URL
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

The Brainiac MCP Server provides a rich set of tools to harness its cognitive power:

### `reason`

Performs complex multi-step reasoning on queries with working memory integration.
**Parameters:**

* `query` (required): The question or problem to reason about
* `context` (optional): Additional context object
* `constraints` (optional): Array of reasoning constraints
* `maxSteps` (optional): Maximum reasoning steps
* `useWorkingMemory` (optional): Whether to utilize working memory
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

* `content` (required): Content to store
* `context` (required): Memory context/category
* `relevance` (optional): Relevance score (0-1)
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

* `query` (required): Search query
* `context` (optional): Context filter
* `limit` (optional): Maximum items to return
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

* `name` (required): Name of the entity
* `type` (required): Type of the entity
* `observations` (optional): Array of observations about the entity
* `metadata` (optional): Additional metadata object
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

* `from` (required): Name of the source entity
* `to` (required): Name of the target entity
* `type` (required): Type of the relation
* `strength` (optional): Strength of the relation (0-1)
* `metadata` (optional): Additional metadata object
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

* `query` (required): Search query
* `entityTypes` (optional): Array of entity types to filter by
* `relationTypes` (optional): Array of relation types to filter by
* `maxResults` (optional): Maximum results to return
* `minRelevance` (optional): Minimum relevance score (0-1)
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

* `problem` (required): The problem statement or question.
* `context` (optional): Record of contextual information.
* `initialThoughts` (optional): Array of initial thoughts to seed the process.
* `maxThoughts` (optional): Maximum number of thoughts to generate.
* `allowBranching` (optional): Boolean, whether to allow thought branching.
* `requireHypotheses` (optional): Boolean, whether hypotheses must be generated.
* `targetConfidence` (optional): Target confidence level for the final answer.
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

* `goal` (required): The overall goal of the ReAct session.
* `initialPlan` (optional): Array of initial actions for the plan.
* `maxCycles` (optional): Maximum number of ReAct cycles.
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

* `sessionId` (required): ID of the active ReAct session.
* `actionName` (required): Name of the action to execute.
* `actionParams` (optional): Parameters for the action.
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

* `sessionId` (required): ID of the active ReAct session.
* `reflection` (required): User-provided reflection on the session's progress.
* `strategicAdjustments` (optional): Array of proposed strategic adjustments.
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

* `targetId` (optional): ID of the target to assess (e.g., reasoning chain ID).
* `targetType` (optional): Type of target ('reasoning_chain', 'sequential_thinking', 'react_cycle').
* `frameworkId` (optional): ID of the constitutional framework to use.
* `includeCorrections` (optional): Boolean, whether to include correction suggestions.
* `autoApplyCorrections` (optional): Boolean, whether to attempt to auto-apply corrections.
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

* `goal` (required): Goal of the critique session.
* `targetIds` (optional): Array of target IDs to include.
* `timeframe` (optional): Object with `start` and `end` timestamps for metrics analysis.
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

* `timeframe` (optional): Object with `start` and `end` timestamps.
* `metricTypes` (optional): Array of specific metric types to retrieve.
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

* `sessionId` (required): ID of the session being evaluated.
* `sessionType` (required): Type of session ('reasoning_chain', 'sequential_thinking', etc.).
* `feedbackType` (required): Type of feedback ('correction', 'preference', 'rating', 'suggestion').
* `rating` (optional): Numerical rating (1-5).
* `corrections` (optional): Array of correction objects.
* `preferences` (optional): Array of preference objects.
* `suggestions` (optional): Array of improvement suggestions.
* `context` (optional): Contextual information.
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

* `priority` (optional): Priority of adaptation ('high', 'medium', 'low').
* `domains` (optional): Array of specific domains to focus adaptation on.
* `forceAdaptation` (optional): Boolean, whether to force adaptation even if thresholds aren't met.
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

* `title` (required): Title of the example.
* `description` (required): Description of the example.
* `input` (required): Input for the example.
* `expectedApproach` (required): Description of the expected reasoning approach.
* `idealProcess` (required): Array of steps in the ideal reasoning process.
* `expectedOutput` (optional): The expected output.
* `qualityRating` (optional): Quality rating of this example (0-1).
* `annotations` (optional): Array of key insights.
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

* `filterByDomain` (optional): Filter patterns by a specific domain.
* `minConfidence` (optional): Minimum confidence level for patterns.
* `includePerformance` (optional): Boolean, whether to include detailed performance data.
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

* `timeframe` (optional): Timeframe for metrics ('hour', 'day', 'week', 'month', or custom start/end timestamps).
* `includeBreakdown` (optional): Boolean, whether to include detailed time-series breakdowns for trend analysis.
* `metricTypes` (optional): Array of specific metric types to retrieve.
**Example:**

```json
{
  "timeframe": { "start": "2025-05-01T00:00:00Z", "end": "2025-05-30T23:59:59Z" },
  "includeBreakdown": true,
  "metricTypes": ["averageReasoningQuality", "userSatisfactionTrend", "adaptationsAppliedCount"]
}
```

### `user_intervention` (NEW!)

Allows a user to interact with and guide an ongoing cognitive process, such as `sequential_thinking` or a `react_session`. This enables collaborative problem-solving by combining human intuition with AI's processing power.
**Parameters:**

* `sessionId` (required): The ID of the active session to intervene in (e.g., `sequential_thinking_id_123`, `react_session_abc`).
* `interventionType` (required): The type of intervention. Supported values:
  * `pause`: Temporarily suspends the cognitive process.
  * `resume`: Resumes a paused process.
  * `query_state`: Requests the current internal state of the process (e.g., current thoughts, confidence levels).
  * `provide_guidance`: Offers specific guidance, hints, corrections, or new information to the process.
  * `request_alternative`: Asks the process to explore a different path, generate alternative solutions, or reconsider a previous step.
  * `end_process`: Terminates the cognitive process gracefully.
* `guidance` (optional): A string or structured object containing the guidance, relevant when `interventionType` is `provide_guidance`. This could be a textual hint, a data snippet, or a directive.
* `parameters` (optional): An object for additional parameters specific to the `interventionType` (e.g., for `request_alternative`, you might specify `numberOfAlternatives: 3`).
**Example:**

```json
{
  "sessionId": "seq_think_complex_problem_alpha",
  "interventionType": "provide_guidance",
  "guidance": "The previous analysis overlooked the recent market shift reported in Q1. Please factor this in and re-evaluate the risk assessment."
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

### Example: Claude Desktop Configuration

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

### Using with Mcp-Use

The `mcp-use` library provides a convenient way to build agents that can interact with MCP servers like Brainiac. You can configure `mcp-use` to manage the lifecycle of the Brainiac server and call its tools.

#### Command-Line Invocation

For quick tests or simple calls, you can use the `mcp-use` command-line interface. Assuming `mcp-use` is installed and your Brainiac server is built (e.g., `npm run build` has been executed in the `brainiac-mcp-server` directory):

```bash
# Example: Using mcp-use to call the 'reason' tool on Brainiac
# Replace /path/to/brainiac-mcp-server with the actual path
mcp-use --server-cmd "node" --server-args "dist/index.js" --server-cwd "/path/to/brainiac-mcp-server" reason '{"query": "What are the core capabilities of Brainiac?"}'
```

This command tells `mcp-use` to:

* Start a server using `node`.
* Pass `dist/index.js` as an argument to `node` (to start the Brainiac server).
* Set the current working directory for the server to `/path/to/brainiac-mcp-server`.
* Call the `reason` tool with the provided JSON payload.

#### Python Agent Example

For more complex integrations, you can use `mcp-use` within your Python applications to create agents that leverage Brainiac's capabilities.

First, ensure you have `mcp-use` and any necessary LLM provider libraries installed:

```bash
pip install mcp-use langchain-openai # Or your preferred LLM provider
```

Then, you can create a Python script like the following:

```python
# main_brainiac_agent.py
import asyncio
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI # Example LLM
from mcp_use import MCPAgent, MCPClient

async def main():
    # Load environment variables (e.g., OPENAI_API_KEY)
    load_dotenv()

    # Configuration for the Brainiac MCP Server
    # IMPORTANT: Replace '/path/to/brainiac-mcp-server' with the actual
    # absolute path to your brainiac-mcp-server directory.
    brainiac_server_path = "/path/to/brainiac-mcp-server" # <--- CHANGE THIS
    if not os.path.isdir(brainiac_server_path) or not os.path.exists(os.path.join(brainiac_server_path, "dist", "index.js")):
        print(f"Error: Brainiac server path not configured correctly or server not built: {brainiac_server_path}")
        print("Please build the server using 'npm run build' in its directory and update the path.")
        return

    config = {
      "mcpServers": {
        "brainiac": {
          "command": "node",  # Command to run the server
          "args": ["dist/index.js"],  # Arguments for the command
          "cwd": brainiac_server_path, # Working directory for the server
          "env": {} # Optional environment variables for the server
        }
      }
    }

    # Create MCPClient from the configuration dictionary
    client = MCPClient.from_dict(config)

    # Create an LLM instance (e.g., OpenAI GPT-4o)
    # Ensure your OPENAI_API_KEY is set in your .env file or environment
    try:
        llm = ChatOpenAI(model="gpt-4o")
    except Exception as e:
        print(f"Error creating LLM. Is your API key configured? Error: {e}")
        return

    # Create an MCPAgent with the client and LLM
    # The agent will have access to tools from all configured servers (in this case, Brainiac)
    agent = MCPAgent(llm=llm, client=client, max_steps=10, verbose=True)

    # Define a query for Brainiac
    query = "Explain the concept of Dynamic Sequential Thinking as implemented in Brainiac."
    # This will implicitly use the 'reason' tool if the LLM deems it appropriate,
    # or you can explicitly call tools if needed for more direct control.

    print(f"Running query with Brainiac: \"{query}\"")

    try:
        # Run the query
        # The agent will use the LLM to decide which tool(s) to call from the Brainiac server
        result = await agent.run(query)
        print(f"\nAgent Result: {result}")

    except Exception as e:
        print(f"An error occurred while running the agent: {e}")
    finally:
        # Clean up and close server sessions
        print("Closing MCP server sessions...")
        await client.close_all_sessions()
        print("Sessions closed.")

if __name__ == "__main__":
    asyncio.run(main())
```

**To run this Python example:**

1. **Save the code:** Save the Python code above as `main_brainiac_agent.py` (or any other name).
2. **Install dependencies:**

    ```bash
    pip install mcp-use langchain-openai python-dotenv
    ```

3. **Build Brainiac Server:** Ensure your Brainiac MCP server is built by running `npm run build` in its directory (`tools/brainiac-mcp-server`).
4. **Update Path:** **Crucially, edit `main_brainiac_agent.py` and replace `"/path/to/brainiac-mcp-server"` with the correct absolute path to your `brainiac-mcp-server` directory.**
5. **Set API Key:** If using OpenAI, create a `.env` file in the same directory as `main_brainiac_agent.py` with your OpenAI API key:

    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

6. **Run the script:**

    ```bash
    python main_brainiac_agent.py
    ```

This script will:

* Start the Brainiac MCP server using the configuration provided.
* Initialize an LLM and an `MCPAgent`.
* Send a query to the agent, which will then leverage the Brainiac server's tools (like `reason` or `sequential_thinking` based on the LLM's decision) to process the query.
* Print the result and then shut down the Brainiac server.

Please refer to the [Mcp-Use documentation](https://github.com/mcp-use/mcp-use) for more advanced `mcp-use` features, such as streaming, multi-server configurations, and tool restrictions.

### Broad Compatibility

Brainiac MCP Server is designed for wide interoperability within the Model Context Protocol ecosystem. It is compatible with a range of MCP clients, including but not limited to:

* Claude Desktop
* WindSurf
* Claude Code
* Cline
* Roo Code
* Cursor
* CoPilotKit
* Microsoft Copilot Studio (via custom MCP connectors)
* Amazon Q CLI (via custom MCP connectors)
* ...and many more MCP-compliant tools and custom integrations!

And many other tools and platforms that support MCP. This broad compatibility ensures you can integrate Brainiac's advanced reasoning into your preferred workflows and development environments.

## Synergies: Brainiac as a Cognitive Hub

Brainiac isn't just a standalone reasoner; it's designed to be a central cognitive hub that can amplify the capabilities of other MCP servers. By orchestrating and reasoning over the inputs and outputs of specialized tools, Brainiac can unlock new levels of automation and insight.

### 1. Enhancing Task Management & Orchestration (e.g., with `task-master-mcp`)

Task management servers, like [Claude Task Master (`task-master-mcp`)](https://github.com/eyaltoledano/claude-task-master), excel at breaking down goals and tracking execution. Brainiac can elevate this by:

* **Sophisticated Planning:** Using `sequential_thinking` or `react_start_session` to develop more complex, adaptive, and context-aware plans for tasks that `task-master-mcp` will then manage or execute. Brainiac can handle ambiguity and generate creative solutions for sub-steps.
* **Dynamic Re-planning & Problem Solving:** If a task executed by another server (managed by `task-master-mcp`) fails or encounters an unexpected obstacle, Brainiac can analyze the situation using its `reason` tool, consult its knowledge graph (and other connected knowledge/memory servers), and propose alternative steps or solutions, guiding the task management server.
* **Constitutional Oversight:** Applying `constitutional_assess` to review project plans or task sequences generated by or for `task-master-mcp`, ensuring they align with strategic objectives, ethical guidelines, or quality standards.
* **User-Guided Complex Workflows:** Leveraging `user_intervention` to allow human insight to steer intricate, multi-tool workflows where Brainiac coordinates several MCP servers, including task managers like `task-master-mcp`.

### 2. Supercharging Knowledge, Memory & RAG Systems (e.g., Knowledgebase RAG, SQLite DBs, `memory-bank-mcp`)

Servers providing access to document stores, databases, vector knowledge bases, or dedicated memory systems are powerful. Brainiac adds a crucial reasoning and integration layer:

* **Intelligent Query Formulation:** Instead of simple keyword searches, Brainiac can use its `reason` tool to understand user intent and formulate more nuanced, multi-faceted queries for `rag_database_server` or other knowledge access servers.
* **Synthesis & Analysis of Retrieved Data:** When a RAG server returns multiple documents or data chunks, Brainiac's `sequential_thinking` can synthesize this information, identify contradictions, draw inferences, and generate a coherent, summarized answer that goes beyond simple retrieval.
* **Persistent Learning & Long-Term Memory (with `memory-bank-mcp`):**
  * Brainiac can leverage servers like [Memory Bank MCP](https://github.com/alioshr/memory-bank-mcp) or similar concepts from the [Anthropic Cookbook for MCP Memory](https://github.com/anthropics/anthropic-cookbook/tree/main/mcp/memory) to store and retrieve its learned adaptations, refined reasoning patterns, complex contextual states, and long-term user preferences.
  * This allows Brainiac to maintain continuity and improve its performance over extended periods and across different sessions, going beyond its internal working memory.
  * Brainiac can reason about *what* information is critical to commit to long-term memory, *when* to retrieve it, and *how* to integrate it with current tasks.
* **Knowledge Graph Enrichment:** Brainiac can process information from external knowledge bases and memory banks, using `knowledge_create_entity` and `knowledge_create_relation` to build or enrich its own internal knowledge graph, or even suggest structured updates back to the source KBs.
* **Strategic Information Foraging:** In complex problem-solving, Brainiac can decide *which* knowledge base or memory store to consult, *what specific information* is needed next, and *how to best obtain it*, acting as an intelligent orchestrator for information retrieval.
* **Learning Optimal Retrieval Strategies:** Through its learning engine, Brainiac can adapt and learn which types of queries or information sources (including different memory banks or RAG setups) are most effective for different kinds of problems.

### 3. Deepening Contextual Understanding & Accessing Up-to-Date Information (e.g., with `context7-mcp`)

Context servers provide vital situational awareness. Brainiac can significantly enhance its operations when combined with servers like [Context7 MCP (`context7-mcp`)](https://github.com/upstash/context7), which specializes in providing up-to-date code documentation and examples:

* **Reason Over Rich & Current Context:** Utilize its `reason` and `sequential_thinking` tools to analyze intricate contextual data. With `context7-mcp`, this includes accessing the latest, version-specific documentation for libraries and frameworks.
* **Accurate Technical & Code-Related Reasoning:** By consuming fresh information from `context7-mcp`, Brainiac can:
  * Provide more accurate explanations of code functionality.
  * Generate code examples that use current APIs and best practices, reducing errors and hallucinations.
  * Improve the quality of `learning_demonstrate` by grounding examples in real, up-to-date code.
* **Context-Aware Decision Making:** Integrate rich contextual information, including precise technical details from `context7-mcp`, into its planning and reasoning processes, leading to more relevant and effective actions, especially in development or debugging scenarios.
* **Learning Contextual Patterns:** Brainiac's learning engine can identify recurring contextual patterns (e.g., specific library versions often leading to certain issues if not handled correctly, as informed by `context7-mcp`) and adapt its behavior accordingly.

### 4. Augmenting Development & Code Analysis (e.g., with `github` MCP server and `context7-mcp`)

When connected to code repositories via servers like the `github` MCP server, Brainiac can:

* **Advanced Code Comprehension:** Use `reason` to analyze retrieved code snippets. This analysis is significantly enhanced when Brainiac can cross-reference the code with up-to-date documentation and examples provided by `context7-mcp`.
* **Strategic Code-Related Planning:** Employ `sequential_thinking` to plan complex coding tasks (refactoring, feature implementation, documentation). Access to current library information via `context7-mcp` ensures these plans are based on valid APIs and practices.
* **Learning Coding Conventions & Patterns:** Over time, Brainiac can learn common coding patterns, anti-patterns, and architectural styles within a specific repository. `context7-mcp` helps ensure that this learning is benchmarked against current standards.

### 5. Intelligent UI Generation & Content Strategy (e.g., with `shadcn-ui-server`)

For MCP servers that assist in UI generation (like `shadcn-ui-server`), Brainiac can contribute by:

* **Planning UI Structures:** Using `sequential_thinking` to outline the structure and flow of complex user interfaces based on high-level requirements.
* **Generating Contextual UI Content:** Employing its `reason` tool to generate relevant text, labels, or placeholder content for UI components based on the application's purpose and context.
* **Adaptive UI Suggestions:** Learning user preferences or common UI patterns to suggest more effective or personalized UI layouts and components.

By acting as an intelligent layer that can understand, plan, reason, and learn, Brainiac transforms a collection of specialized MCP tools into a cohesive, more powerful cognitive ecosystem.

## Architecture

Brainiac's architecture is designed for sophisticated cognitive processing and continuous evolution.

### Cognitive Processing Pipeline

1. **Input Ingestion & Analysis**: Queries and contextual data are parsed and broken down into fundamental components.
2. **Knowledge Retrieval**: Relevant information is dynamically accessed from working memory (short-term context) and the persistent knowledge graph (long-term understanding).
3. **Cognitive Strategy Selection**: Based on the task, Brainiac selects appropriate reasoning strategies (e.g., Sequential Thinking, ReAct, direct knowledge query).
4. **Core Reasoning & Synthesis**: The chosen strategy is executed, combining analyzed inputs with retrieved knowledge to form new insights, hypotheses, or plans. This involves iterative refinement and internal state updates.
5. **Constitutional Evaluation**: Reasoning outputs are assessed against defined principles for quality, coherence, and reliability. Self-correction mechanisms may be triggered.
6. **Learning & Adaptation**: Outcomes, feedback, and performance data are fed into the Learning Engine to update internal models, reasoning patterns, and adaptation rules. This is a continuous background process.
7. **Action Simulation & Execution (ReAct)**: For ReAct cycles, proposed actions are simulated or executed, and observations are integrated.
8. **Response Generation & Output**: Results, including reasoning traces, confidence scores, and supporting evidence, are formatted and delivered via MCP.

### Working Memory Management

* **Capacity Management**: Strategies for managing memory load (though explicit cleanup of low-relevance items is not yet fully automated).
* **Relevance Scoring**: Dynamic prioritization of memory items (partially implemented).
* **Context Categorization**: Organized storage by domain/topic.
* **Temporal Decay**: Time-based relevance adjustment (not explicitly implemented, but timestamps are stored).

### Knowledge Graph

* Stores a rich, interconnected web of entities, concepts, and their relationships.
* Supports complex semantic queries and inferential reasoning.
* Dynamically updated through learning processes and direct knowledge provisioning.
* Forms the bedrock of Brainiac's long-term understanding and contextual awareness.
* Integrated with reasoning and learning processes.

### Learning & Adaptation

Brainiac features a sophisticated Learning & Adaptation Engine, enabling it to evolve its reasoning strategies over time. This engine processes feedback, learns from demonstrations, and applies adaptive rules to continuously improve performance. For a detailed exploration of these capabilities, see the [🧠 Advanced Learning & Continuous Improvement](#advanced-learning--continuous-improvement) section.

## 🧠 Advanced Learning & Continuous Improvement

Brainiac's Learning & Adaptation Engine is at the heart of its ability to evolve and improve. It comprises several key components and processes:

* **Feedback Processing:** Utilizes the `learning_feedback` tool to incorporate user ratings, corrections, and suggestions.
* **Demonstration Learning:** Analyzes ideal problem-solving examples through the `learning_demonstrate` tool to extract effective techniques and strategies.
* **Pattern Recognition:** Identifies and refines successful reasoning patterns using the `learning_patterns` tool, enhancing its problem-solving playbook.
* **Proactive Adaptation:** Applies intelligent adjustments to its strategies and parameters via the `learning_adapt` tool, optimizing performance over time.

This engine ensures that Brainiac doesn't just solve problems but gets better at solving them, offering a significant edge in dynamic or complex environments.

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

Thoroughly test the server using a variety of MCP clients and scenarios:

* Utilize tools like the **Claude Desktop**, **WindSurf**, or a custom script with `@modelcontextprotocol/sdk`.
* Test individual MCP tools with diverse inputs, including edge cases.
* Verify the `sequential_thinking` and `react_session` flows with complex problems.
* Assess the `constitutional_assess` tool's ability to identify predefined flaws.
* Monitor learning progression using `learning_metrics` after providing feedback and demonstrations.
* Test the new `user_intervention` tool across different session types and intervention commands.

## Troubleshooting

### Common Issues

**Server not starting:**

* Ensure Node.js 18+ is installed.
* Check that dependencies are installed with `npm install`.
* Verify the build completed successfully with `npm run build`.

**MCP client connection issues:**

* Confirm the server path in client configuration is correct.
* Check that the server process has proper permissions to execute.
* Verify stdio transport is working correctly between client and server.

**Memory not persisting / Cognitive State Reset:**

* By default, Brainiac's working memory, knowledge graph, and learning adaptations are in-memory and will reset upon server restart.
* **For persistence:** The server now includes robust cognitive state persistence. Ensure your environment has write permissions for the `cognitive_state.json` file (or the configured path). The server automatically saves its state periodically and on shutdown, and loads it on startup. If you encounter issues, check file permissions and disk space. The `loadCognitiveStateFromFile` and `saveCognitiveStateToFile` methods in `app.ts` manage this.
  
## Developer
Developed and Engineered by Anthony Cavanaugh for Cavanaugh Design Studio

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

