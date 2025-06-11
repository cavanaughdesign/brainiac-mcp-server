import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { watch } from 'fs/promises';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
    ReasoningInput,
    ReasoningOutput,
    MemoryInput,
    MemoryOutput,
    WorkingMemory,
    WorkingMemoryItem,
    ReasoningChain,
    ReasoningStep,
    CognitiveState,
    KnowledgeResource,
    Entity,
    Relation,
    KnowledgeGraph,
    KnowledgeGraphMemory,
    SemanticResult,
    SequentialThinking,
    SequentialThinkingInput,
    SequentialThinkingOutput,
    ThoughtStep,
    ThoughtBranch,
    HypothesisTest,
    ReActInput,
    ReActOutput,
    ReActSession,
    ReActCycle,
    Action,
    Observation,
    ActionPlan,    
    ConstitutionalFramework,
    ConstitutionalInput,
    ConstitutionalOutput,
    ReasoningPrinciple,
    SelfAssessment,
    ReasoningFlaw,
    CorrectionSuggestion,
    QualityMetrics,
    CritiqueSession,
    UserFeedback,
    ReasoningPattern,
    AdaptationRule,
    LearningExample,
    PerformanceTracker,
    UserInterventionInput,
    LearningEngine,
    ReasoningTool,
    AppliedCorrectionLogEntry,
    PrincipleAssessment,
    LearningLogEntry, // Added import
} from './types/index.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class BrainiacMCPServer {
    [x: string]: any;
    public server: Server;
    private cognitiveState: CognitiveState;
    private toolSchemas: ReasoningTool[] = []; // To store tool definitions
    private readonly COGNITIVE_STATE_FILE_PATH = path.join(__dirname, '..', 'cognitive_state_store.json');
    private readonly RESOURCE_FILE_PATH = path.join(__dirname, '..', 'resources.json');
    private readonly TOOL_SCHEMA_FILE_PATH = path.join(__dirname, '..', 'tool_schemas.json');
    private autoSaveInterval: NodeJS.Timeout | null = null;
    private readonly AUTO_SAVE_INTERVAL_MS = 5 * 60 * 1000; // Save every 5 minutes, for example
    

    constructor() {
        this.server = new Server({
            name: 'brainiac-mcp-server',
            version: '0.1.0',
        }, {
            capabilities: {
                tools: {}, // Will be populated by tool schemas
                resources: {}, // Will be populated by resource schemas
            },
        });
        this.cognitiveState = this.createDefaultCognitiveState(); // Initialize with default
        this.populateToolSchemas(); // Populate tool schemas
        this.setupHandlers(); // Setup MCP handlers
        this.registerDefaultResources(); // Placeholder
        this.startFileWatcher(); // Start file watcher for cognitive state changes
        this.initLearningEngineConfig(); // Initialize learning engine configuration from environment variables
        this.startAutoSave(); // Start auto-save mechanism
    }

     private startAutoSave(): void {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        this.autoSaveInterval = setInterval(async () => {
            console.log('✅Auto-saving cognitive state...');
            await this.saveCognitiveStateToFile();
        }, this.AUTO_SAVE_INTERVAL_MS);
        console.log(`🧠Cognitive state auto-save initiated. Interval: ${this.AUTO_SAVE_INTERVAL_MS / 1000 / 60} minutes.`);
    }

    private stopAutoSave(): void {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
            console.log('🧠Cognitive state auto-save stopped.');
        }
    }
 
    private async stop(): Promise<void> {
        console.log('⚠️Stopping Brainiac MCP Server...');
        this.stopAutoSave();
        await this.saveCognitiveStateToFile(); // Final save on stop
        if (this.cognitivePulseInterval) { // From previous suggestion
            clearInterval(this.cognitivePulseInterval);
            this.cognitivePulseInterval = null;
        } // Stop auto-save before shutting down
        await this.saveCognitiveStateToFile(); // Ensure state is saved on shutdown
        console.log('🧠Brainiac MCP Server shut down gracefully.');
        process.exit(0); // Exit the process gracefully
    }

    private createDefaultLearningEngine(): LearningEngine {
        return {
            id: 'default_learner_engine',
            status: 'active',
            configuration: {
                feedbackWeight: 0.7,
                patternThreshold: 0.6,
                adaptationAggressiveness: 0.5,
                exampleInfluence: 0.4,
            },
            capabilities: {
                feedbackIntegration: true,
                patternRecognition: true,
                strategyAdaptation: true,
                demonstrationLearning: true,
            },
            stats: {
                totalFeedbackProcessed: 0,
                patternsRecognized: 0,
                adaptationsApplied: 0,
                examplesLearned: 0,
                improvementMeasured: 0,
            },
            lastActivity: {
                feedbackProcessing: Date.now(),
                patternAnalysis: Date.now(),
                adaptationUpdate: Date.now(),
                exampleIntegration: Date.now(),
                performanceEvaluation: Date.now(),
            }
        };
    }

    private createDefaultPerformanceTracker(): PerformanceTracker {
        return {
            id: 'default-tracker-' + Date.now(),
            timeframe: {
                start: Date.now(),
                end: Date.now() + 24 * 60 * 60 * 1000, // Default to 1 day
                period: 'day'
            },
            metrics: {
                sessionCount: 0,
                averageQuality: 0,
                userSatisfaction: 0,
                adaptationSuccess: 0,
                patternUtilization: 0,
                improvementRate: 0
            },
            breakdown: {
                byProblemType: {},
                byDomain: {},
                byComplexity: {},
                bySessionType: {}
            },
            trends: {
                qualityTrend: 'stable',
                satisfactionTrend: 'stable',
                adaptationTrend: 'stable',
                changeRate: 0
            },
            insights: {
                strengths: [],
                weaknesses: [],
                opportunities: [],
                recommendations: []
            },
            // Added missing fields from the provided CognitiveState definition in the prompt
            totalSessions: 0,
            successfulSessions: 0,
            averageCyclesPerSession: 0,
            lastUpdated: Date.now(),
        };
    }


    private createDefaultCognitiveState(): CognitiveState {
        const defaultKnowledgeGraph: KnowledgeGraph = {
            entities: new Map<string, Entity>(),
            relations: [] as Relation[],
            metadata: { totalEntities: 0, totalRelations: 0, lastUpdated: Date.now() }
        };

        const defaultWorkingMemory: KnowledgeGraphMemory = {
            knowledgeGraph: defaultKnowledgeGraph,
            semanticCache: new Map<string, SemanticResult>(),
            items: [] as WorkingMemoryItem[],
            capacity: 1000, // Default capacity
            currentLoad: 0,
            indexingMetadata: {
                lastFullIndex: 0,
                incrementalUpdates: 0,
            }
        };

        return {
            workingMemory: defaultWorkingMemory,
            activeReasoningChains: [],
            activeSequentialThinking: [],
            activeReActSessions: [],
            activeCritiqueSessions: [],
            constitutionalFramework: this.createDefaultConstitutionalFramework(),
            assessmentHistory: [],
            qualityMetrics: [],
            processingLoad: 0,
            attention: ['idle'],
            context: {},
            actionHistory: [],
            observationHistory: [],
            learningsLog: [], // Corrected from learningsDatabase: string[]
            learningsDatabase: [], // Kept as per type, assuming it's for structured logs
            learningEngine: this.createDefaultLearningEngine(),
            userFeedbackHistory: [],
            recognizedPatterns: [],
            adaptationRules: [],
            exampleDatabase: [],
            performanceTracker: this.createDefaultPerformanceTracker(),
            performanceHistory: [], // Initialize as empty array
            cycleHistory: [] // Initialize as empty array
        };
    }


    private initLearningEngineConfig(): void {
        // Load LearningEngine config from environment variables, falling back to defaults
        const feedbackWeight = parseFloat(process.env.LEARNING_FEEDBACK_WEIGHT || '0.7');
        const patternThreshold = parseFloat(process.env.LEARNING_PATTERN_THRESHOLD || '0.6');
        const adaptationAggressiveness = parseFloat(process.env.LEARNING_ADAPTATION_AGGRESSIVENESS || '0.5');
        const exampleInfluence = parseFloat(process.env.LEARNING_EXAMPLE_INFLUENCE || '0.4');

        if (isNaN(feedbackWeight) || isNaN(patternThreshold) || isNaN(adaptationAggressiveness) || isNaN(exampleInfluence)) {
            console.error("Invalid learning engine configuration from environment variables. Using default values.");
            // Optionally, halt the process or revert to a known good state.
        }

        if (this.cognitiveState && this.cognitiveState.learningEngine) {
            // Apply configurations, ensuring values are within acceptable ranges
            this.cognitiveState.learningEngine.configuration.feedbackWeight = Math.max(0, Math.min(1, feedbackWeight));
            this.cognitiveState.learningEngine.configuration.patternThreshold = Math.max(0, Math.min(1, patternThreshold));
            this.cognitiveState.learningEngine.configuration.adaptationAggressiveness = Math.max(0, Math.min(1, adaptationAggressiveness));
            this.cognitiveState.learningEngine.configuration.exampleInfluence = Math.max(0, Math.min(1, exampleInfluence));

            console.log("Initialized learning engine configurations using:", this.cognitiveState.learningEngine.configuration);

            // Feature Flag: Enable/Disable Learning Engine
            const isLearningEngineEnabled = process.env.ENABLE_LEARNING_ENGINE === 'true';
            if (!isLearningEngineEnabled) {
                this.cognitiveState.learningEngine.status = 'disabled';
                console.warn("Learning Engine is disabled via environment configuration.");
            } else {
                 this.cognitiveState.learningEngine.status = 'active';
            }

            // Add monitoring and logging for config changes
            console.log("Monitoring and logging learning engine configurations.");
            // Example: this.someInternalMonitoringService.logEvent('LearningEngineConfigured', this.cognitiveState.learningEngine.configuration);

        } else {
            console.warn("Learning engine not available in cognitive state for config initialization.");
        }
    }

    public async start(port: number): Promise<void> {
        await this.loadAndInitializeCognitiveState();
        this.initLearningEngineConfig(); // Re-initialize if loading changed config

        // The SDK's server.listen doesn't take a port directly in the version used by StdioServerTransport
        // Assuming a generic listen method if this were a typical HTTP server.
        // For StdioServerTransport, connect is used.
        // If an HTTP server is intended, the transport and listen mechanism would differ.
        console.log(`Brainiac MCP Server (HTTP mode) would listen on port ${port} if configured.`);
        // Example for a conceptual HTTP server:
        // const httpServer = http.createServer((req, res) => { /* MCP request handling */ });
        // this.server.connect(new SomeHttpTransport(httpServer)); // Hypothetical
        // httpServer.listen(port, () => console.log(`Server listening on ${port}`));

        // For now, this method is a placeholder if not using Stdio.
        // If using Stdio, runStdio() is the correct method.
        // Fallback to stdio if http is not fully set up
        await this.runStdio();

    }

    private async runStdio(): Promise<void> {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.log('Brainiac MCP Server running on stdio');
    }

    private async loadAndInitializeCognitiveState(): Promise<void> {
        const loaded = await this.loadCognitiveStateFromFile();
        if (!loaded) {
            console.log('No existing cognitive state found or error loading. Initializing with default state and saving.');
            // Default state is already set by constructor.
            await this.saveCognitiveStateToFile();
        } else {
            console.log('Cognitive state loaded successfully from file.');
        }
    }

    private async loadCognitiveStateFromFile(): Promise<boolean> {
        try {
            const fileContent = await fs.readFile(this.COGNITIVE_STATE_FILE_PATH, 'utf-8');
            const loadedData = JSON.parse(fileContent);
            if (loadedData.workingMemory && loadedData.workingMemory.knowledgeGraph && loadedData.workingMemory.knowledgeGraph.entities) {
                // Assuming entities were stored as an array of [key, value] pairs
                loadedData.workingMemory.knowledgeGraph.entities = new Map(loadedData.workingMemory.knowledgeGraph.entities);
            }
            // Similar revival for semanticCache if it's a Map
            if (loadedData.workingMemory && loadedData.workingMemory.semanticCache) {
                loadedData.workingMemory.semanticCache = new Map(loadedData.workingMemory.semanticCache);
            }
            const defaultState = this.createDefaultCognitiveState(); // Get a fresh default state for merging
            this.cognitiveState = deepMerge(defaultState, loadedData); // Use a deep merge function to combine states

            // Deep merge, prioritizing loaded data but falling back to defaults for missing fields
            const newCognitiveState: CognitiveState = {
                ...defaultState,
                ...loadedData,

                // Explicitly handle complex nested objects and Maps
                workingMemory: {
                    ...defaultState.workingMemory,
                    ...(loadedData.workingMemory || {}),
                    knowledgeGraph: {
                        ...defaultState.workingMemory.knowledgeGraph,
                        ...(loadedData.workingMemory?.knowledgeGraph || {}),
                        entities: new Map(loadedData.workingMemory?.knowledgeGraph?.entities || []), // Rehydrate Map
                        relations: loadedData.workingMemory?.knowledgeGraph?.relations || defaultState.workingMemory.knowledgeGraph.relations,
                        metadata: {
                            ...defaultState.workingMemory.knowledgeGraph.metadata,
                            ...(loadedData.workingMemory?.knowledgeGraph?.metadata || {}),
                        }
                    },
                    semanticCache: new Map(loadedData.workingMemory?.semanticCache || []), // Rehydrate Map
                    items: loadedData.workingMemory?.items || defaultState.workingMemory.items,
                    capacity: loadedData.workingMemory?.capacity ?? defaultState.workingMemory.capacity,
                    currentLoad: loadedData.workingMemory?.currentLoad ?? defaultState.workingMemory.currentLoad,
                    indexingMetadata: {
                        ...defaultState.workingMemory.indexingMetadata,
                        ...(loadedData.workingMemory?.indexingMetadata || {}),
                    }
                },
                // Ensure arrays are properly assigned
                activeReasoningChains: loadedData.activeReasoningChains || defaultState.activeReasoningChains,
                activeSequentialThinking: loadedData.activeSequentialThinking || defaultState.activeSequentialThinking,
                activeReActSessions: loadedData.activeReActSessions || defaultState.activeReActSessions,
                activeCritiqueSessions: loadedData.activeCritiqueSessions || defaultState.activeCritiqueSessions,
                assessmentHistory: loadedData.assessmentHistory || defaultState.assessmentHistory,
                qualityMetrics: loadedData.qualityMetrics || defaultState.qualityMetrics,
                actionHistory: loadedData.actionHistory || defaultState.actionHistory,
                observationHistory: loadedData.observationHistory || defaultState.observationHistory,
                learningsLog: loadedData.learningsLog || defaultState.learningsLog,
                learningsDatabase: loadedData.learningsDatabase || defaultState.learningsDatabase,
                userFeedbackHistory: loadedData.userFeedbackHistory || defaultState.userFeedbackHistory,
                recognizedPatterns: loadedData.recognizedPatterns || defaultState.recognizedPatterns,
                adaptationRules: loadedData.adaptationRules || defaultState.adaptationRules,
                exampleDatabase: loadedData.exampleDatabase || defaultState.exampleDatabase,
                performanceHistory: loadedData.performanceHistory || defaultState.performanceHistory,
                cycleHistory: loadedData.cycleHistory || defaultState.cycleHistory,

                // Merge complex objects carefully
                constitutionalFramework: loadedData.constitutionalFramework ? { ...defaultState.constitutionalFramework, ...loadedData.constitutionalFramework } : defaultState.constitutionalFramework,
                learningEngine: loadedData.learningEngine ? { ...defaultState.learningEngine, ...loadedData.learningEngine, configuration: {...defaultState.learningEngine.configuration, ...loadedData.learningEngine?.configuration}, capabilities: {...defaultState.learningEngine.capabilities, ...loadedData.learningEngine?.capabilities}, stats: {...defaultState.learningEngine.stats, ...loadedData.learningEngine?.stats}, lastActivity: {...defaultState.learningEngine.lastActivity, ...loadedData.learningEngine?.lastActivity} } : defaultState.learningEngine,
                performanceTracker: loadedData.performanceTracker ? { ...defaultState.performanceTracker, ...loadedData.performanceTracker } : defaultState.performanceTracker,
            };

            this.cognitiveState = newCognitiveState;
            return true;
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                console.log(`Cognitive state file not found: ${this.COGNITIVE_STATE_FILE_PATH}. Will create a new one.`);
            } else {
                console.error('Error loading cognitive state:', error);
            }
            return false;
        }
    }

    private async saveCognitiveStateToFile(): Promise<void> {
        try {
            // Create a serializable version of the cognitive state
            const serializableCognitiveState = JSON.parse(JSON.stringify(this.cognitiveState)); // Deep clone to avoid modifying original

            if (this.cognitiveState.workingMemory.knowledgeGraph.entities) {
                serializableCognitiveState.workingMemory.knowledgeGraph.entities = Array.from(this.cognitiveState.workingMemory.knowledgeGraph.entities.entries());
            }
            if (this.cognitiveState.workingMemory.semanticCache) {
                serializableCognitiveState.workingMemory.semanticCache = Array.from(this.cognitiveState.workingMemory.semanticCache.entries());
            }
            // Add conversions for any other Map or Set objects

            const data = JSON.stringify(serializableCognitiveState, null, 2);
            await fs.writeFile(this.COGNITIVE_STATE_FILE_PATH, data, 'utf-8');
            console.log('Cognitive state saved to file.');
        } catch (error) {
            console.error('Error saving cognitive state:', error);
        }
    }

    private async handlePersistCognitiveState(): Promise<{ content: [{ type: 'text', text: string }] }> {
        await this.saveCognitiveStateToFile();
        return {
            content: [{
                type: 'text',
                text: 'Cognitive state persistence triggered successfully and saved to file.'
            }]
        };
    }

    private initializeTools(): ReasoningTool[] { // Changed Tool[] to ReasoningTool[]
        return [
            {
                name: 'persist_cognitive_state',
                description: 'Saves the current cognitive state to persistent storage.',
                inputSchema: {
                    type: 'object',
                    properties: {},
                    required: []
                }
            },
            {
                name: 'example_tool_method',
                description: 'An example tool method for demonstration.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        someParam: {
                            type: 'string',
                            description: 'A parameter for the example tool.'
                        }
                    },
                    required: ['someParam']
                }
            },
            {
                name: 'query_language_model',
                description: 'Query the underlying language model',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'The query to send to the language model'
                        },
                        useWorkingMemory: {
                            type: 'boolean',
                            description: 'Whether to use working memory for context'
                        }
                    },
                    required: ['query']
                }
            },
            {
                name: 'memory_store',
                description: 'Store information in working memory',
                inputSchema: {
                    type: 'object',
                    properties: {
                        content: {
                            type: 'string',
                            description: 'Content to store in memory'
                        },
                        context: {
                            type: 'string',
                            description: 'Context or category for the memory'
                        },
                        relevance: {
                            type: 'number',
                            description: 'Relevance score (0-1)'
                        }
                    },
                    required: ['content', 'context']
                }
            },
            {
                name: 'memory_retrieve',
                description: 'Retrieve information from working memory',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'Query to search memory'
                        },
                        context: {
                            type: 'string',
                            description: 'Context filter for memory search'
                        },
                        limit: {
                            type: 'number',
                            description: 'Maximum number of items to retrieve'
                        }
                    },
                    required: ['query']
                }
            }, {
                name: 'cognitive_state',
                description: 'Get current cognitive state including working memory and active processes',
                inputSchema: {
                    type: 'object',
                    properties: {},
                    required: []
                }
            },
            {
                name: 'knowledge_create_entity',
                description: 'Create a new entity in the knowledge graph',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of the entity'
                        },
                        type: {
                            type: 'string',
                            description: 'Type/category of the entity'
                        },
                        observations: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Initial observations about the entity'
                        }
                    },
                    required: ['name', 'type']
                }
            },
            {
                name: 'knowledge_create_relation',
                description: 'Create a relation between two entities',
                inputSchema: {
                    type: 'object',
                    properties: {
                        from: {
                            type: 'string',
                            description: 'Source entity name'
                        },
                        to: {
                            type: 'string',
                            description: 'Target entity name'
                        },
                        type: {
                            type: 'string',
                            description: 'Type of relation'
                        },
                        strength: {
                            type: 'number',
                            description: 'Strength of the relation (0-1)'
                        }
                    },
                    required: ['from', 'to', 'type']
                }
            }, {
                name: 'knowledge_semantic_search',
                description: 'Search the knowledge graph semantically',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'Search query'
                        },
                        entityTypes: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Filter by entity types'
                        },
                        maxResults: {
                            type: 'number',
                            description: 'Maximum results to return'
                        },
                        minRelevance: {
                            type: 'number',
                            description: 'Minimum relevance score (0-1)'
                        }
                    },
                    required: ['query']
                }
            },
            {
                name: 'sequential_thinking',
                description: 'Perform dynamic sequential thinking with branching, revision, and hypothesis testing',
                inputSchema: {
                    type: 'object',
                    properties: {
                        problem: {
                            type: 'string',
                            description: 'The problem or question to think through'
                        },
                        context: {
                            type: 'object',
                            description: 'Additional context for thinking'
                        },
                        maxThoughts: {
                            type: 'number',
                            description: 'Maximum number of thoughts to generate'
                        },
                        allowBranching: {
                            type: 'boolean',
                            description: 'Whether to allow branching thought paths'
                        },
                        requireHypotheses: {
                            type: 'boolean',
                            description: 'Whether to require hypothesis generation and testing'
                        }
                    },
                    required: ['problem']
                }
            },
            {
                name: 'react_start_session',
                description: 'Start a new ReAct (Reasoning and Acting) session for goal-oriented action cycles',
                inputSchema: {
                    type: 'object',
                    properties: {
                        goal: {
                            type: 'string',
                            description: 'The goal to achieve through ReAct cycles'
                        },
                        context: {
                            type: 'object',
                            description: 'Additional context for the session'
                        },
                        maxCycles: {
                            type: 'number',
                            description: 'Maximum number of ReAct cycles'
                        },
                        allowedActions: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Types of actions allowed in this session'
                        },
                        simulationMode: {
                            type: 'boolean',
                            description: 'Whether to run in simulation mode'
                        }
                    },
                    required: ['goal']
                }
            },
            {
                name: 'react_execute_action',
                description: 'Execute an action within a ReAct session and generate observations',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sessionId: {
                            type: 'string',
                            description: 'ID of the active ReAct session'
                        },
                        actionType: {
                            type: 'string',
                            description: 'Type of action to execute'
                        },
                        actionName: {
                            type: 'string',
                            description: 'Name of the specific action'
                        },
                        parameters: {
                            type: 'object',
                            description: 'Parameters for the action'
                        },
                        reasoning: {
                            type: 'string',
                            description: 'Reasoning behind choosing this action'
                        }
                    }, required: ['sessionId', 'actionType', 'actionName', 'reasoning']
                }
            },
            {
                name: 'react_reflect',
                description: 'Reflect on the outcomes of actions and plan next steps in a ReAct session',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sessionId: {
                            type: 'string',
                            description: 'ID of the active ReAct session'
                        },
                        reflection: {
                            type: 'string',
                            description: 'Reflection on the current cycle outcomes'
                        },
                        strategicAdjustments: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Strategic adjustments to make'
                        }
                    }, required: ['sessionId', 'reflection']
                }
            },
            {
                name: 'constitutional_assess',
                description: 'Perform constitutional assessment of reasoning quality',
                inputSchema: {
                    type: 'object',
                    properties: {
                        targetId: {
                            type: 'string',
                            description: 'ID of the target to assess (reasoning chain, thinking session, etc.)'
                        },
                        targetType: {
                            type: 'string',
                            enum: ['reasoning_chain', 'sequential_thinking', 'react_cycle'],
                            description: 'Type of target being assessed'
                        },
                        frameworkId: {
                            type: 'string',
                            description: 'ID of constitutional framework to use (optional, uses default if not provided)'
                        },
                        includeCorrections: {
                            type: 'boolean',
                            description: 'Whether to include correction suggestions'
                        },
                        autoApplyCorrections: {
                            type: 'boolean',
                            description: 'Whether to automatically apply corrections'
                        }
                    },
                    required: ['targetId', 'targetType'] // Added targetId and targetType as required based on ConstitutionalInput
                }
            },
            {
                name: 'constitutional_critique',
                description: 'Start a comprehensive critique session for continuous improvement',
                inputSchema: {
                    type: 'object',
                    properties: {
                        goal: {
                            type: 'string',
                            description: 'Goal of the critique session'
                        },
                        targetIds: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'IDs of targets to include in the critique session'
                        },
                        timeframe: {
                            type: 'object',
                            properties: {
                                start: { type: 'number' },
                                end: { type: 'number' }
                            },
                            description: 'Time range for metrics analysis'
                        }
                    },
                    required: ['goal']
                }
            },
            {
                name: 'constitutional_metrics',
                description: 'Get quality metrics and trends for constitutional assessments',
                inputSchema: {
                    type: 'object',
                    properties: {
                        timeframe: {
                            type: 'object',
                            properties: {
                                start: { type: 'number' },
                                end: { type: 'number' }
                            },
                            description: 'Time range for metrics (optional)'
                        },
                        metricTypes: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Specific metric types to include'
                        }
                    }, required: []
                }
            },
            {
                name: 'learning_feedback',
                description: 'Submit user feedback to improve reasoning quality',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sessionId: {
                            type: 'string',
                            description: 'ID of the session being evaluated'
                        },
                        sessionType: {
                            type: 'string',
                            enum: ['reasoning_chain', 'sequential_thinking', 'react_cycle', 'constitutional_assessment'],
                            description: 'Type of session being evaluated'
                        },
                        feedbackType: {
                            type: 'string',
                            enum: ['correction', 'preference', 'rating', 'suggestion'],
                            description: 'Type of feedback being provided'
                        },
                        rating: {
                            type: 'number',
                            minimum: 1,
                            maximum: 5,
                            description: 'Quality rating (1-5 scale)'
                        },
                        corrections: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    original: { type: 'string' },
                                    corrected: { type: 'string' },
                                    reason: { type: 'string' },
                                    confidence: { type: 'number' }
                                },
                                required: ['original', 'corrected', 'reason']
                            },
                            description: 'Specific corrections to reasoning'
                        },
                        preferences: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    aspect: { type: 'string' },
                                    preference: { type: 'string' },
                                    strength: { type: 'number' }
                                },
                                required: ['aspect', 'preference']
                            },
                            description: 'User preferences for reasoning style'
                        },
                        suggestions: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Improvement suggestions'
                        },
                        context: {
                            type: 'object',
                            properties: {
                                problemType: { type: 'string' },
                                domain: { type: 'string' },
                                complexity: { type: 'number' },
                                userExperience: { type: 'string' }
                            },
                            description: 'Context information'
                        }
                    },
                    required: ['sessionId', 'sessionType', 'feedbackType']
                }
            },
            {
                name: 'learning_adapt',
                description: 'Trigger adaptation based on learned patterns and feedback',
                inputSchema: {
                    type: 'object',
                    properties: {
                        immediate: {
                            type: 'boolean',
                            description: 'Whether to apply adaptations immediately'
                        },
                        priority: {
                            type: 'string',
                            enum: ['low', 'medium', 'high'],
                            description: 'Priority level for adaptations'
                        },
                        forceUpdate: {
                            type: 'boolean',
                            description: 'Force update even if confidence is low'
                        },
                        targetDomains: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Specific domains to focus adaptation on'
                        }
                    },
                    required: []
                }
            },
            {
                name: 'learning_demonstrate',
                description: 'Learn from demonstration examples of good reasoning',
                inputSchema: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Title of the learning example'
                        },
                        description: {
                            type: 'string',
                            description: 'Description of what this example demonstrates'
                        },
                        input: {
                            type: 'object',
                            description: 'Problem input that was reasoned about'
                        },
                        context: {
                            type: 'object',
                            description: 'Context for the reasoning task'
                        },
                        expectedApproach: {
                            type: 'string',
                            description: 'The approach that should be taken'
                        },
                        idealProcess: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Step-by-step ideal reasoning process'
                        },
                        expectedOutput: {
                            type: 'object',
                            description: 'Expected reasoning output'
                        },
                        qualityRating: {
                            type: 'number',
                            minimum: 0,
                            maximum: 1,
                            description: 'Quality rating of this example (0-1)'
                        },
                        annotations: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Key insights and explanations'
                        },
                        techniques: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Reasoning techniques demonstrated'
                        },
                        principles: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Reasoning principles illustrated'
                        }
                    },
                    required: ['title', 'description', 'input', 'expectedApproach', 'idealProcess']
                }
            },
            {
                name: 'learning_patterns',
                description: 'View recognized reasoning patterns and adaptation rules',
                inputSchema: {
                    type: 'object',
                    properties: {
                        patternType: {
                            type: 'string',
                            enum: ['all', 'high_performance', 'recent', 'domain_specific'],
                            description: 'Type of patterns to retrieve'
                        },
                        domain: {
                            type: 'string',
                            description: 'Specific domain to filter patterns'
                        },
                        minConfidence: {
                            type: 'number',
                            minimum: 0,
                            maximum: 1,
                            description: 'Minimum confidence threshold'
                        },
                        includeAdaptations: {
                            type: 'boolean',
                            description: 'Whether to include adaptation rules'
                        }
                    },
                    required: []
                }
            },
            {
                name: 'learning_metrics',
                description: 'Get performance metrics and learning progress',
                inputSchema: {
                    type: 'object',
                    properties: {
                        timeframe: {
                            type: 'object',
                            properties: {
                                start: { type: 'number' },
                                end: { type: 'number' },
                                period: {
                                    type: 'string',
                                    enum: ['hour', 'day', 'week', 'month']
                                }
                            },
                            description: 'Time range for metrics analysis'
                        },
                        metricTypes: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: ['performance', 'satisfaction', 'adaptation', 'patterns', 'improvement']
                            },
                            description: 'Specific metrics to include'
                        },
                        breakdown: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: ['problemType', 'domain', 'complexity', 'sessionType']
                            },
                            description: 'How to break down the metrics'
                        }
                    },
                    required: []
                }
            },
            {
                name: 'user_intervention',
                description: 'Allows a user or external system to intervene in an ongoing session (e.g., SequentialThinking or ReAct).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sessionId: {
                            type: 'string',
                            description: 'The ID of the session to intervene in.'
                        },
                        sessionType: {
                            type: 'string',
                            enum: ['sequential_thinking', 'react_session'],
                            description: 'The type of the session.'
                        },
                        interventionType: {
                            type: 'string',
                            enum: ['thought_correction', 'action_override', 'pause_session', 'resume_session', 'provide_hint'],
                            description: 'The type of intervention being performed.'
                        },
                        payload: {
                            type: 'object',
                            description: 'Data specific to the intervention type.',
                            properties: {
                                thoughtNumberToCorrect: { type: 'number' },
                                newContent: { type: 'string' },
                                nextAction: { type: 'object' }, // Define Action schema if needed
                                hint: { type: 'string' }
                            }
                        }
                    },
                    required: ['sessionId', 'sessionType', 'interventionType']
                }
            }
        ];
        
    }

    private populateToolSchemas(): void {
        this.toolSchemas = this.initializeTools();
        console.log('Tool schemas populated.');
    }

    private async exampleToolMethod(input: { someParam: string }): Promise<{ result: string }> {
    console.log('exampleToolMethod called with:', input);
    await new Promise(resolve => setTimeout(resolve, 100));
    return { result: `Processed: ${input.someParam}` };
    }

    private setupHandlers(): void {
        // List available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: this.toolSchemas
        }));

        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;

            try {
            switch (name) {
                case 'reason':
                    return await this.handleReasoning(args as unknown as ReasoningInput);
                case 'memory_store':
                    return await this.handleMemoryStore(args);
                case 'memory_retrieve':
                    return await this.handleMemoryRetrieve(args);
                case 'cognitive_state':
                    return await this.handleCognitiveState();
                case 'knowledge_create_entity':
                    return await this.handleCreateEntity(args);
                case 'knowledge_create_relation':
                    return await this.handleCreateRelation(args);
                case 'knowledge_semantic_search':
                    return await this.handleSemanticSearch(args);
                case 'sequential_thinking':
                    return await this.handleSequentialThinking(args as unknown as SequentialThinkingInput);
                case 'react_start_session':
                    return await this.handleReActStartSession(args as unknown as ReActInput);
                case 'react_execute_action':
                    return await this.handleReActExecuteAction(args);
                case 'react_reflect':
                    return await this.handleReActReflect(args);
                case 'constitutional_assess':
                    return await this.handleConstitutionalAssess(args as unknown as ConstitutionalInput);
                case 'constitutional_critique':
                    return await this.handleConstitutionalCritique(args);
                case 'constitutional_metrics':
                    return await this.handleConstitutionalMetrics(args);
                case 'learning_feedback':
                    return await this.handleLearningFeedback(args);
                case 'learning_adapt':
                    return await this.handleLearningAdapt(args);
                case 'learning_demonstrate':
                    return await this.handleLearningDemonstrate(args);
                case 'learning_patterns':
                    return await this.handleLearningPatterns(args);
                case 'learning_metrics':
                    return await this.handleLearningMetrics(args);
                case 'persist_cognitive_state':
                    return await this.handlePersistCognitiveState();
                case 'user_intervention':
                    return await this.handleUserIntervention(args as unknown as UserInterventionInput);
                case 'example_tool_method':
                    if (!args || typeof (args as any).someParam !== 'string') {
                        throw new Error('Invalid arguments for example_tool_method. Expected { someParam: string }.');
                    }
                    return await this.exampleToolMethod(args as { someParam: string });
                default:
                    throw new Error(`Unknown tool: ${name}`);
            }
            } catch (error: any) {
                console.error(`Error calling tool ${name}:`, error);
                return {
                    content: [{
                        type: 'text',
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`
                    }],
                    isError: true
                };
            }
        });
        // List available resources
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
            resources: [
                {
                    uri: 'memory://working',
                    name: 'Working Memory',
                    description: 'Current working memory contents',
                    mimeType: 'application/json',
                    metadata: {
                        domain: 'internal_state',
                        reliability: 0.9,
                        lastUpdated: Date.now(), // Or more specific update time
                        accessCount: 0
                    }
                },
                {
                    uri: 'state://cognitive',
                    name: 'Cognitive State',
                    description: 'Current cognitive processing state',
                    mimeType: 'application/json',
                    metadata: {
                        domain: 'internal_state',
                        reliability: 0.95,
                        lastUpdated: Date.now(), // Or more specific update time
                        accessCount: 0
                    }
                },
                {
                    uri: 'knowledge://graph',
                    name: 'Knowledge Graph',
                    description: 'Semantic knowledge graph with entities and relations',
                    mimeType: 'application/json',
                    metadata: {
                        domain: 'knowledge_representation',
                        reliability: 0.85,
                        lastUpdated: this.cognitiveState.workingMemory.knowledgeGraph.metadata.lastUpdated,
                        accessCount: 0
                    }
                }
            ] as KnowledgeResource[]
        }));

        // Handle resource reads
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            const { uri } = request.params;
            switch (uri) {
                case 'memory://working':
                // Ensure workingMemory.items is stringified.
                // Consider if other parts of workingMemory should be included or if items is sufficient.
                return { content: JSON.stringify(this.cognitiveState.workingMemory.items) };
            case 'state://cognitive':
                const serializableCognitiveState = JSON.parse(JSON.stringify(this.cognitiveState));
                if (serializableCognitiveState.workingMemory.knowledgeGraph.entities) {
                    serializableCognitiveState.workingMemory.knowledgeGraph.entities = Array.from(this.cognitiveState.workingMemory.knowledgeGraph.entities.entries());
                }
                if (serializableCognitiveState.workingMemory.semanticCache) {
                    serializableCognitiveState.workingMemory.semanticCache = Array.from(this.cognitiveState.workingMemory.semanticCache.entries());
                }
                // Add conversions for any other Map objects in cognitiveState
                return { content: JSON.stringify(serializableCognitiveState) };
            case 'knowledge://graph':
                const serializableKnowledgeGraph = JSON.parse(JSON.stringify(this.cognitiveState.workingMemory.knowledgeGraph));
                if (serializableKnowledgeGraph.entities) {
                     serializableKnowledgeGraph.entities = Array.from(this.cognitiveState.workingMemory.knowledgeGraph.entities.entries());
                }
                // Add conversions for any other Map objects in knowledgeGraph if they exist
                return { content: JSON.stringify(serializableKnowledgeGraph) };
            default:
                throw new Error(`Unknown resource: ${uri}`);
            }
        });
    }

    private registerDefaultResources(): void {
        console.log('Default resources registration handled by ListResourcesRequestSchema setup.');
    }


    
    private async startFileWatcher(): Promise<void> { // Make the method async
        console.log(`File watcher started for: ${this.COGNITIVE_STATE_FILE_PATH}`);
        try {
            const watcher = watch(this.COGNITIVE_STATE_FILE_PATH);
            for await (const event of watcher) {
                // The 'event' object here has 'eventType' and 'filename' properties
                if (event.eventType === 'change') {
                    // filename might be null or undefined on some platforms for certain events.
                    // Use a fallback if necessary.
                    const changedFilename = event.filename || 'unknown file';
                    console.log(`Cognitive state file changed: ${changedFilename}. Reloading state.`);
                    try {
                        await this.loadAndInitializeCognitiveState();
                        console.log('Cognitive state reloaded successfully.');
                    } catch (err) {
                        // It's good practice to type 'err' if you need to inspect its properties, e.g., err: any or err: Error
                        console.error('Error reloading cognitive state after file change:', err);
                    }
                }
            }
        } catch (err) {
            console.error(`File watcher for ${this.COGNITIVE_STATE_FILE_PATH} encountered an error:`, err);
            // You might want to implement retry logic or specific error handling here.
        }
    }
    
    // ...existing code...

    private async handleReasoning(input: ReasoningInput) {
        const reasoningChain: ReasoningChain = {
            id: `reasoning-${Date.now()}`,
            steps: [],
            startTime: Date.now(),
            status: 'active',
            goal: input.query
        };

        this.cognitiveState.activeReasoningChains.push(reasoningChain);

        try {
            // Analysis step
            const analysisStep: ReasoningStep = {
                id: `step-${Date.now()}-1`,
                type: 'analysis',
                input: input.query,
                output: `Analyzing query: "${input.query}"`,
                confidence: 0.8,
                reasoning: 'Breaking down the problem into components',
                timestamp: Date.now(),
                metadata: {
                    correctionDetails: undefined
                }
            };
            reasoningChain.steps.push(analysisStep);

            // Synthesis step
            const synthesisStep: ReasoningStep = {
                id: `step-${Date.now()}-2`,
                type: 'synthesis',
                input: analysisStep.output,
                output: `Synthesized understanding of the query with available context`,
                confidence: 0.7,
                reasoning: 'Combining analysis with working memory and context',
                timestamp: Date.now(),
                metadata: {
                    correctionDetails: undefined
                }
            };
            reasoningChain.steps.push(synthesisStep);

            // Evaluation step
            const evaluationStep: ReasoningStep = {
                id: `step-${Date.now()}-3`,
                type: 'evaluation',
                input: synthesisStep.output,
                output: `Evaluated response based on reasoning chain`,
                confidence: 0.75,
                reasoning: 'Assessing the quality and completeness of the reasoning',
                timestamp: Date.now(),
                metadata: {
                    correctionDetails: undefined
                }
            };
            reasoningChain.steps.push(evaluationStep);

            reasoningChain.endTime = Date.now();
            reasoningChain.status = 'completed';

            const output: ReasoningOutput = {
                result: evaluationStep.output,
                reasoning: reasoningChain,
                confidence: 0.75,
                sources: ['working_memory', 'cognitive_processing']
            };

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(output, null, 2)
                }]
            };
        } catch (error) {
            reasoningChain.status = 'failed';
            throw error;
        } finally {
            this.cognitiveState.activeReasoningChains = 
                this.cognitiveState.activeReasoningChains.filter(chain => chain.id !== reasoningChain.id);
        }
    }    
    
    private async handleMemoryStore(args: any) {
        const item: WorkingMemoryItem = {
            id: `memory-${Date.now()}`,
            content: args.content,
            timestamp: Date.now(),
            relevance: args.relevance || 0.5,
            context: args.context
        };

        // Manage memory capacity
        if (this.cognitiveState.workingMemory.items.length >= this.cognitiveState.workingMemory.capacity) {
            // Remove least relevant item
            this.cognitiveState.workingMemory.items.sort((a: { relevance: number; }, b: { relevance: number; }) => a.relevance - b.relevance);
            this.cognitiveState.workingMemory.items.shift();
        }

        this.cognitiveState.workingMemory.items.push(item);
        this.cognitiveState.workingMemory.currentLoad = this.cognitiveState.workingMemory.items.length;

        // Auto-create knowledge graph entities from memory content
        const entityName = args.context || `memory-concept-${Date.now()}`;
        const existingEntity = this.cognitiveState.workingMemory.knowledgeGraph.entities.get(entityName);
        
        if (existingEntity) {
            // Add observation to existing entity
            existingEntity.observations.push(args.content);
            existingEntity.metadata.lastUpdated = Date.now();
            existingEntity.metadata.relevanceScore = Math.max(existingEntity.metadata.relevanceScore, args.relevance || 0.5);
        } else {
            // Create new entity
            const entity: Entity = {
                id: `entity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: entityName,
                type: 'memory-derived',
                observations: [args.content],
                metadata: {
                    created: Date.now(),
                    lastUpdated: Date.now(),
                    relevanceScore: args.relevance || 0.5,
                    accessCount: 0
                }
            };
            
            this.cognitiveState.workingMemory.knowledgeGraph.entities.set(entityName, entity);
            this.cognitiveState.workingMemory.knowledgeGraph.metadata.totalEntities++;
            this.cognitiveState.workingMemory.knowledgeGraph.metadata.lastUpdated = Date.now();
        }

        return {
            content: [{
                type: 'text',
                text: JSON.stringify({
                    success: true,
                    itemId: item.id,
                    memoryLoad: this.cognitiveState.workingMemory.currentLoad,
                    knowledgeGraphUpdated: true,
                    entityName
                }, null, 2)
            }]
        };
    } 

    
    private async handleMemoryRetrieve(args: any) {
        const { query, context, limit = 5 } = args;
        
        // First try semantic search in knowledge graph
        let semanticResults: Entity[] = [];
        if (query) {
            const searchResult = await this.handleSemanticSearch({
                query,
                entityTypes: context ? ['memory-derived'] : undefined,
                maxResults: limit * 2, // Get more to filter later
                minRelevance: 0.1
            });
            
            const searchData = JSON.parse(searchResult.content[0].text);
            semanticResults = searchData.entities || [];
        }

        // Traditional memory item search
        let relevantItems = this.cognitiveState.workingMemory.items;

        // Filter by context if provided
        if (context) {
            relevantItems = relevantItems.filter((item: { context: string; }) => 
                item.context.toLowerCase().includes(context.toLowerCase())
            );
        }

        // Simple text matching for query
        if (query) {
            relevantItems = relevantItems.filter((item: { content: { toString: () => string; }; }) =>
                item.content.toString().toLowerCase().includes(query.toLowerCase())
            );
        }

        // Sort by relevance and timestamp
        relevantItems.sort((a: { relevance: number; timestamp: number; }, b: { relevance: number; timestamp: number; }) => {
            const relevanceDiff = b.relevance - a.relevance;
            if (relevanceDiff !== 0) return relevanceDiff;
            return b.timestamp - a.timestamp;
        });

        const memoryResults = relevantItems.slice(0, limit);
        
        // Combine and deduplicate results
        const combinedResults = {
            query,
            memoryItems: memoryResults,
            semanticEntities: semanticResults.slice(0, limit),
            totalMemoryFound: relevantItems.length,
            totalSemanticFound: semanticResults.length,
            returned: Math.max(memoryResults.length, semanticResults.length),
            searchStrategy: 'hybrid_semantic_memory'
        };

        return {
            content: [{
                type: 'text',
                text: JSON.stringify(combinedResults, null, 2)
            }]
        };
    }

    private async handleCognitiveState() {
        return {
            content: [{
                type: 'text',
                text: JSON.stringify(this.cognitiveState, null, 2)
            }]
        };
    }

    // Knowledge Graph Handlers
    private async handleCreateEntity(args: any) {
        const { name, type, observations = [] } = args;
        
        const entity: Entity = {
            id: `entity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name,
            type,
            observations,
            metadata: {
                created: Date.now(),
                lastUpdated: Date.now(),
                relevanceScore: 0.5,
                accessCount: 0
            }
        };

        this.cognitiveState.workingMemory.knowledgeGraph.entities.set(name, entity);
        this.cognitiveState.workingMemory.knowledgeGraph.metadata.totalEntities++;
        this.cognitiveState.workingMemory.knowledgeGraph.metadata.lastUpdated = Date.now();

        return {
            content: [{
                type: 'text',
                text: JSON.stringify({
                    success: true,
                    entity,
                    graphStats: {
                        totalEntities: this.cognitiveState.workingMemory.knowledgeGraph.metadata.totalEntities,
                        totalRelations: this.cognitiveState.workingMemory.knowledgeGraph.metadata.totalRelations
                    }
                }, null, 2)
            }]
        };
    }

    private async handleCreateRelation(args: any) {
        const { from, to, type, strength = 0.5 } = args;
        
        // Check if both entities exist
        const fromEntity = this.cognitiveState.workingMemory.knowledgeGraph.entities.get(from);
        const toEntity = this.cognitiveState.workingMemory.knowledgeGraph.entities.get(to);
        
        if (!fromEntity || !toEntity) {
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: `Entity not found: ${!fromEntity ? from : to}`,
                        availableEntities: Array.from(this.cognitiveState.workingMemory.knowledgeGraph.entities.keys())
                    }, null, 2)
                }]
            };
        }

        const relation: Relation = {
            id: `relation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            from,
            to,
            type,
            strength: Math.max(0, Math.min(1, strength)),
            metadata: {
                created: Date.now(),
                lastAccessed: Date.now(),
                confidence: 0.8
            }
        };

        this.cognitiveState.workingMemory.knowledgeGraph.relations.push(relation);
        this.cognitiveState.workingMemory.knowledgeGraph.metadata.totalRelations++;
        this.cognitiveState.workingMemory.knowledgeGraph.metadata.lastUpdated = Date.now();

        return {
            content: [{
                type: 'text',
                text: JSON.stringify({
                    success: true,
                    relation,
                    graphStats: {
                        totalEntities: this.cognitiveState.workingMemory.knowledgeGraph.metadata.totalEntities,
                        totalRelations: this.cognitiveState.workingMemory.knowledgeGraph.metadata.totalRelations
                    }
                }, null, 2)
            }]
        };
    }

    private async handleSemanticSearch(args: any) {
        const { query, entityTypes, maxResults = 10, minRelevance = 0.1 } = args;
        
        // Check cache first
        const cacheKey = JSON.stringify(args);
        const cached = this.cognitiveState.workingMemory.semanticCache.get(cacheKey);
        if (cached) {
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify({
                        ...cached,
                        fromCache: true
                    }, null, 2)
                }]
            };
        }

        const startTime = Date.now();
        const queryLower = query.toLowerCase();
        const results: { entity: Entity; relevance: number }[] = [];

        // Search entities
        for (const [name, entity] of this.cognitiveState.workingMemory.knowledgeGraph.entities) {
            // Update access count
            entity.metadata.accessCount++;
            
            let relevance = 0;
            
            // Name matching
            if (entity.name.toLowerCase().includes(queryLower)) {
                relevance += 0.8;
            }
            
            // Type matching
            if (entityTypes && entityTypes.includes(entity.type)) {
                relevance += 0.6;
            }
            
            // Observation matching
            for (const observation of entity.observations) {
                if (observation.toLowerCase().includes(queryLower)) {
                    relevance += 0.4;
                }
            }
            
            // Apply entity's existing relevance score
            relevance = (relevance + entity.metadata.relevanceScore) / 2;
            
            if (relevance >= minRelevance) {
                results.push({ entity, relevance });
            }
        }

        // Sort by relevance
        results.sort((a, b) => b.relevance - a.relevance);
        const topResults = results.slice(0, maxResults);

        // Find related relations
        const entityNames = new Set(topResults.map(r => r.entity.name));
        const relatedRelations = this.cognitiveState.workingMemory.knowledgeGraph.relations.filter(
            rel => entityNames.has(rel.from) || entityNames.has(rel.to)
        );

        const searchResult: SemanticResult = {
            entities: topResults.map(r => r.entity),
            relations: relatedRelations,
            relevanceScores: topResults.map(r => r.relevance),
            searchMetadata: {
                totalMatches: results.length,
                searchTime: Date.now() - startTime,
                queryComplexity: query.split(' ').length
            }
        };

        // Cache the result
        this.cognitiveState.workingMemory.semanticCache.set(cacheKey, searchResult);

        return {
            content: [{
                type: 'text',
                text: JSON.stringify(searchResult, null, 2)
            }]
        };
    }

    private async handleSequentialThinking(args: SequentialThinkingInput): Promise<any> { // Changed args: any to args: SequentialThinkingInput
        const { 
            problem, 
            context = {}, 
            maxThoughts = 10, 
            allowBranching = true, 
            requireHypotheses = false 
        } = args;

        const thinking: SequentialThinking = {
            id: `thinking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            goal: problem,
            currentThought: 0,
            totalThoughtsEstimate: Math.min(maxThoughts, 8),            thoughts: [],
            branches: [],
            hypotheses: [],
            isComplete: false,
            metadata: {
                startTime: Date.now(),
                totalRevisions: 0,
                branchingPoints: 0,
                complexityScore: this.calculateProblemComplexity(problem)
            },
            status: 'active'
        };

        this.cognitiveState.activeSequentialThinking.push(thinking);

        try {
            let keepThinking = true;
            while (!thinking.isComplete && thinking.currentThought < maxThoughts && keepThinking && thinking.status === 'active') {
                keepThinking = await this.continueThinking(thinking, context, allowBranching, requireHypotheses);
                // Check for external status changes (e.g., paused by user intervention)
                const currentSessionState = this.cognitiveState.activeSequentialThinking.find(s => s.id === thinking.id);
                if (!currentSessionState || currentSessionState.status !== 'active') {
                    break; 
                }
            }

            if (thinking.status === 'active') { // If not paused or failed by intervention
                thinking.isComplete = true;
                thinking.status = 'completed';
                thinking.finalAnswer = await this.synthesizeFinalAnswer(thinking);
                thinking.metadata.endTime = Date.now();
            }
            
            const output: SequentialThinkingOutput = {
                thinking,
                finalAnswer: thinking.finalAnswer || "Thinking process did not complete with a final answer.",
                confidence: this.calculateOverallConfidence(thinking),
                reasoning: this.generateReasoningExplanation(thinking),
                metadata: {
                    thoughtCount: thinking.currentThought,
                    revisionCount: thinking.metadata.totalRevisions,
                    branchCount: thinking.metadata.branchingPoints,
                    solutionPath: this.extractSolutionPath(thinking)
                }
            };
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(output, null, 2)
                }]
            };

        } catch (error: any) {
            console.error(`Error in sequential thinking for goal "${thinking.goal}":`, error);
            thinking.status = 'failed';
            thinking.isComplete = true;
            thinking.metadata.endTime = Date.now();
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify({
                        error: `Sequential thinking failed: ${error.message}`,
                        thinkingId: thinking.id,
                        status: thinking.status
                    }, null, 2)
                }],
                isError: true
            };
        } finally {
            // Remove from active sessions if completed or failed, unless it's awaiting input
            if (thinking.status === 'completed' || thinking.status === 'failed') {
                this.cognitiveState.activeSequentialThinking = this.cognitiveState.activeSequentialThinking.filter(
                    activeThinking => activeThinking.id !== thinking.id
                );
            }
        }
    }

    private async handleUserIntervention(args: UserInterventionInput): Promise<any> {
        const { sessionId, sessionType, interventionType, payload } = args;
        let session: SequentialThinking | ReActSession | undefined;

        if (sessionType === 'sequential_thinking') {
            session = this.cognitiveState.activeSequentialThinking.find(s => s.id === sessionId);
        } else {
            session = this.cognitiveState.activeReActSessions.find(s => s.id === sessionId);
        }

        if (!session || session.status !== 'awaiting_user_input') {
            return { content: [{ type: 'text', text: `Session ${sessionId} not found or not awaiting input.` }] };
        }

        let message = `Intervention received for session ${sessionId}.`;

        if (sessionType === 'sequential_thinking' && interventionType === 'thought_correction' && payload.thoughtNumberToCorrect && payload.newContent) {
            const thinkingSession = session as SequentialThinking;
            const thoughtToCorrect = thinkingSession.thoughts.find(t => t.thoughtNumber === payload.thoughtNumberToCorrect);
            if (thoughtToCorrect) {
                thoughtToCorrect.content = `User Correction: ${payload.newContent}`;
                thoughtToCorrect.confidence = 0.95; // User input is highly confident
                thoughtToCorrect.metadata.isRevision = true;
                // Potentially remove subsequent thoughts or mark them for re-evaluation
                thinkingSession.thoughts = thinkingSession.thoughts.slice(0, thinkingSession.thoughts.indexOf(thoughtToCorrect) + 1);
                thinkingSession.currentThought = thoughtToCorrect.thoughtNumber;
                message += ` Thought ${payload.thoughtNumberToCorrect} corrected.`;
            }
        } else if (sessionType === 'react_session' && interventionType === 'action_override' && payload.nextAction) {
            const reactSession = session as ReActSession;
            // Override the next planned action
            reactSession.actionPlan.actions.splice(reactSession.actionPlan.currentActionIndex, reactSession.actionPlan.actions.length - reactSession.actionPlan.currentActionIndex, payload.nextAction as Action);
            reactSession.actionPlan.status = 'executing';
            message += ` Next action overridden.`;
        } else {
            message = `Intervention type ${interventionType} not fully handled for ${sessionType}.`;
        }

        session.status = 'active'; // Resume processing
        session.lastUpdated = Date.now();

        return { content: [{ type: 'text', text: message + " Resuming session." }] };
        // The client would then call the main execution endpoint again (e.g., handleSequentialThinking or handleReActExecuteAction)
        // or the server could proactively continue the loop if designed that way.
    }

    private async addThought(thinking: SequentialThinking, content: string, isRevision: boolean, confidence: number, revisesThought?: number): Promise<void> {
        thinking.currentThought++;
        
        const thought: ThoughtStep = {
            id: `thought-${thinking.id}-${thinking.currentThought}`,
            thoughtNumber: thinking.currentThought,
            content,
            confidence: Math.max(0, Math.min(1, confidence)),
            timestamp: Date.now(),
            metadata: {
                isRevision,
                revisesThought,
                needsMoreThoughts: thinking.currentThought < thinking.totalThoughtsEstimate
            }
        };

        thinking.thoughts.push(thought);

        if (isRevision) {
            thinking.metadata.totalRevisions++;
        }

        // Store thought in knowledge graph
        await this.storeThoughtInKnowledgeGraph(thinking, thought);
    }

    private async continueThinking(thinking: SequentialThinking, context: any, allowBranching: boolean, requireHypotheses: boolean): Promise<boolean> {
        if (thinking.status === 'awaiting_user_input') {
            console.log(`Thinking session ${thinking.id} is awaiting user input. Pausing continuation.`);
            return false; // Stop thinking if awaiting input
        }
        const lastThought = thinking.thoughts[thinking.thoughts.length - 1];
        const LOW_CONFIDENCE_THRESHOLD_FOR_REVISION = 0.5;
        const STAGNATION_LOOKBACK = 3;

        // Analyze if we need to revise previous thinking
        // Condition 1: Last thought had very low confidence
        if (lastThought && lastThought.confidence < LOW_CONFIDENCE_THRESHOLD_FOR_REVISION && thinking.currentThought > 1) {
            await this.addThought(thinking, `Revisiting thought ${lastThought.thoughtNumber} due to low confidence (${lastThought.confidence.toFixed(2)}).`, true, 0.6, lastThought.thoughtNumber);
            // Potentially revert or adjust the last thought, or generate an alternative
        }

        // Condition 2: Explicit uncertainty in last thought
        if (lastThought && (lastThought.content.toLowerCase().includes("not sure") ||
            lastThought.content.toLowerCase().includes("uncertain about") ||
            lastThought.content.toLowerCase().includes("need to reconsider"))) {
            await this.addThought(thinking, `Addressing uncertainty from thought ${lastThought.thoughtNumber}.`, true, 0.65, lastThought.thoughtNumber);
        }

        // Condition 3: Stagnation detection (simple version - content similarity)
        if (thinking.thoughts.length > STAGNATION_LOOKBACK) {
            const lastNThoughts = thinking.thoughts.slice(-STAGNATION_LOOKBACK);
            const uniqueContent = new Set(lastNThoughts.map(t => t.content.substring(0, 50))); // Check first 50 chars
            if (uniqueContent.size < STAGNATION_LOOKBACK / 2) { // If less than half are unique
                await this.addThought(thinking, `Detected potential stagnation. Attempting to break the loop by exploring a new angle.`, true, 0.6, lastThought?.thoughtNumber);
                if (allowBranching) await this.considerBranching(thinking); // Force a branch if stagnating
            }
        }
        
        // Point where intervention might be solicited if confidence is critically low
    if (lastThought && lastThought.confidence < 0.4 && thinking.currentThought > 2 && thinking.status !== 'active' && thinking.status !== 'needs_input_from_user') { // Avoid re-triggering if already waiting
        console.warn(`Low confidence in thought ${lastThought.thoughtNumber} for session ${thinking.id}. Setting status to await user intervention.`);
        thinking.status = 'awaiting_user_input'; // Or 'needs_input_from_user' if that's the preferred state
        // Log this state change or prepare a message for the user
        this.cognitiveState.learningsLog.push({
            id: `intervention_needed_${thinking.id}_${Date.now()}`,
            timestamp: Date.now(),
            message: `Sequential thinking session ${thinking.id} requires user intervention due to low confidence.`,
            sessionId: thinking.id,
            tags: ['intervention_needed', 'sequential_thinking', 'low_confidence'],
            severity: 'warning'
        });
        return false; // Stop thinking and wait for intervention
    }

        // Generate next logical thought
        const nextThoughtContent = await this.generateNextThought(thinking, context);
        const confidence = this.estimateThoughtConfidence(thinking, nextThoughtContent);
        
        await this.addThought(thinking, nextThoughtContent, false, confidence);

        // Check if we need hypothesis testing
        if (requireHypotheses && thinking.hypotheses.length === 0 && thinking.currentThought >= 3 && confidence > 0.6) {
            await this.generateHypothesis(thinking);
        }

        // Check if we should consider branching
        if (allowBranching && thinking.currentThought % 3 === 0 && confidence > 0.5 && thinking.branches.filter(b => b.isActive).length < 2) { // Limit active branches
            await this.considerBranching(thinking);
        }
        
        // Determine if we need more thoughts based on the enhanced assessment
        const needsMore = this.assessNeedForMoreThoughts(thinking);
        
        if (!needsMore && thinking.currentThought >= 3) {
            thinking.isComplete = true;
            thinking.status = 'completed';
            thinking.finalAnswer = await this.synthesizeFinalAnswer(thinking);
            thinking.metadata.endTime = Date.now();
            return false; // No more thoughts needed
        }

        return needsMore; // Continue thinking if more thoughts are needed
    }

    // ...existing code...
    private async generateNextThought(thinking: SequentialThinking, context: any): Promise<string> {
        const thoughtCount = thinking.thoughts.length;
        const lastThought = thinking.thoughts.length > 0 ? thinking.thoughts[thinking.thoughts.length - 1] : null;
        
        // Check working memory for relevant context
        const relevantMemory = this.cognitiveState.workingMemory.items
            .filter(item => item.relevance > 0.6 && item.content.length > 10) // Added minimum content length
            .sort((a,b) => b.relevance - a.relevance)
            .slice(0, 3);
        
        // Consider active branches
        const activeBranch = thinking.branches.find(b => b.status === 'exploring');

        // Check for hypotheses being tested
        const activeHypothesis = thinking.hypotheses.find(h => h.status === 'testing');
        
        // Generate next thought based on current phase and context
        if (thoughtCount === 0) { // Should be handled by the initial thought in handleSequentialThinking
            return this.generateInitialAnalysis(thinking.goal, context);
        } else if (thoughtCount === 1) {
            return this.generateInitialAnalysis(thinking.goal, context, lastThought);
        } else if (thoughtCount === 2 && lastThought) {
            return this.generateApproachIdentification(lastThought.content, relevantMemory, thinking.goal);
        } else if (thoughtCount === 3 && lastThought) {
            return this.generateEvaluation(thinking.thoughts, context, thinking.goal);
        } else if (activeHypothesis && lastThought) {
            return this.generateHypothesisTesting(activeHypothesis, lastThought, thinking);
        } else if (activeBranch && lastThought) {
            return this.generateBranchExploration(activeBranch, lastThought, thinking);
        } else if (thinking.metadata.complexityScore > 0.65 && thoughtCount < (thinking.totalThoughtsEstimate - 2) && lastThought) { // Ensure not too close to end
            return this.generateComplexAnalysis(thinking.thoughts, context, thinking.goal);
        } else {
            return this.generateSynthesis(thinking.thoughts, relevantMemory, thinking.goal);
        }
    }

    private generateInitialAnalysis(goal: string, context: any, previousThought?: ThoughtStep | null): string {
        let analysisText = "";
        if (previousThought) {
            analysisText = `Continuing from "${this.extractMainPoint(previousThought.content)}". `;
        }
        analysisText += `Let's break down the core aspects of the goal: "${goal}". `;
        const keywords = this.extractKeywords(goal);
        if (keywords.length > 0) {
            analysisText += `Key terms identified: ${keywords.join(', ')}. `;
        }

        analysisText += "Initial considerations include: ";
        const considerations: string[] = [];
        considerations.push("understanding the primary objectives and desired outcomes");
        if (context?.constraints && Array.isArray(context.constraints) && context.constraints.length > 0) {
            considerations.push(`adhering to constraints: ${context.constraints.join(', ')}`);
        } else {
            considerations.push("identifying any implicit or explicit constraints");
        }
        if (context?.scope) {
            considerations.push(`defining the scope: ${context.scope}`);
        } else {
            considerations.push("clarifying the scope of the problem");
        }
        considerations.push("identifying available information and potential knowledge gaps");

        analysisText += considerations.map((c, i) => `${i + 1}. ${c}`).join('; ');
        analysisText += ". This structured approach should help in forming a clear path forward.";
        return analysisText;
    }

    private generateApproachIdentification(previousThoughtContent: string, relevantMemory: WorkingMemoryItem[], goal: string): string {
        let approachText = `Following the initial analysis of "${this.extractMainPoint(previousThoughtContent)}", I need to identify potential strategies to address "${goal}". `;
        
        const potentialApproaches: string[] = [];
        const keywordsFromGoal = this.extractKeywords(goal);

        if (keywordsFromGoal.includes("compare") || keywordsFromGoal.includes("evaluate") || keywordsFromGoal.includes("choose")) {
            potentialApproaches.push("a comparative analysis of options");
        }
        if (keywordsFromGoal.includes("design") || keywordsFromGoal.includes("create") || keywordsFromGoal.includes("develop")) {
            potentialApproaches.push("a structured design process with iterative refinement");
            potentialApproaches.push("prototyping and testing key components");
        }
        if (keywordsFromGoal.includes("solve") || keywordsFromGoal.includes("problem") || keywordsFromGoal.includes("issue")) {
            potentialApproaches.push("root cause analysis to understand underlying factors");
            potentialApproaches.push("breaking the problem into smaller, manageable sub-problems");
        }
        if (keywordsFromGoal.includes("research") || keywordsFromGoal.includes("understand") || keywordsFromGoal.includes("explain")) {
            potentialApproaches.push("a systematic information gathering and synthesis approach");
        }

        if (potentialApproaches.length === 0) { // Default approaches
            potentialApproaches.push("a step-by-step logical deduction");
            potentialApproaches.push("brainstorming multiple solutions before selection");
        }
        
        approachText += `Possible approaches include: ${potentialApproaches.map((pa, i) => `${i+1}. ${pa}`).join('; ')}. `;

        if (relevantMemory.length > 0) {
            approachText += `I should also consider insights from past experiences. For instance, memory item "${this.extractMainPoint(relevantMemory[0].content)}" (relevance: ${relevantMemory[0].relevance.toFixed(2)}) might be pertinent. `;
            if (relevantMemory.length > 1) {
                approachText += `Another relevant item is "${this.extractMainPoint(relevantMemory[1].content)}" (relevance: ${relevantMemory[1].relevance.toFixed(2)}). `;
            }
        }
        approachText += "Next, I'll evaluate these approaches for suitability.";
        return approachText;
    }

    private generateEvaluation(thoughts: ThoughtStep[], context: any, goal: string): string {
        const identifiedApproaches = thoughts.filter(t => t.content.toLowerCase().includes("approach") || t.content.toLowerCase().includes("strategy"));
        let evaluationText = `Now, let's evaluate the identified approaches for tackling "${goal}". `;

        if (identifiedApproaches.length > 0) {
            const lastApproachThought = identifiedApproaches[identifiedApproaches.length - 1];
            evaluationText += `Specifically, considering the ideas from "${this.extractMainPoint(lastApproachThought.content)}". `;
        } else {
            evaluationText += "Even without explicitly listed approaches, I'll use general criteria. ";
        }
        
        const criteria = (context?.evaluationCriteria && Array.isArray(context.evaluationCriteria) && context.evaluationCriteria.length > 0)
            ? context.evaluationCriteria
            : ['effectiveness in achieving the goal', 'efficiency of the method', 'feasibility given constraints', 'potential risks and mitigation'];
        
        evaluationText += `Key evaluation criteria will be: ${criteria.map((c: string, i: number) => `${i+1}. ${c}`).join('; ')}. `;
        evaluationText += "This assessment will help select the most promising path or refine the strategy.";
        return evaluationText;
    }

    private generateHypothesisTesting(hypothesis: HypothesisTest, lastThought: ThoughtStep, thinking: SequentialThinking): string {
        let testingText = `Continuing to test the hypothesis: "${hypothesis.hypothesis}" (current confidence: ${hypothesis.confidence.toFixed(2)}). `;
        testingText += `So far, there are ${hypothesis.evidence.length} supporting points and ${hypothesis.counterEvidence.length} counter-points. `;
        
        const nextTest = this.determineNextTest(hypothesis, lastThought); // This method itself is static
        testingText += `The next step is to: ${nextTest}. `;
        
        if (hypothesis.evidence.length > hypothesis.counterEvidence.length && hypothesis.confidence > 0.7) {
            testingText += "The hypothesis appears to be gaining support. ";
        } else if (hypothesis.counterEvidence.length > hypothesis.evidence.length && hypothesis.confidence < 0.4) {
            testingText += "The hypothesis is facing significant challenges; re-evaluation might be needed soon. ";
        }
        testingText += `This systematic testing is crucial for validating assumptions for goal: "${thinking.goal}".`;
        return testingText;
    }

    private generateBranchExploration(branch: ThoughtBranch, lastThought: ThoughtStep, thinking: SequentialThinking): string {
        let branchText = `Exploring the alternative perspective defined by branch "${branch.description}" (Confidence: ${branch.confidence.toFixed(2)}). `;
        branchText += `The last thought in the main line was "${this.extractMainPoint(lastThought.content)}". `;
        
        const nextConsideration = this.determineNextConsideration(branch); // This method is static
        branchText += `Within this branch, the next consideration is to: ${nextConsideration}. `;
        
        if (branch.thoughts.length > 2) {
            branchText += `This branch has developed ${branch.thoughts.length} thoughts. I need to see if it converges or offers a distinct valuable insight for "${thinking.goal}".`;
        } else {
            branchText += `This branch is still in its early stages of exploration for "${thinking.goal}".`;
        }
        return branchText;
    }

    private generateComplexAnalysis(thoughts: ThoughtStep[], context: any, goal: string): string {
        const combinedContent = thoughts.map(t => t.content).join(' ');
        const keywords = this.extractKeywords(combinedContent).slice(0, 3); // Limit to 3 for brevity
        
        let analysisText = `Given the progression of ${thoughts.length} thoughts on "${goal}", a more complex analysis is warranted. `;
        
        if (keywords.length > 0) {
            analysisText += `Key themes emerging are: ${keywords.join(', ')}. `;
        } else {
            analysisText += "Several interconnected ideas have surfaced. ";
        }

        const complexities: string[] = [];
        if (context?.interdependencies && Array.isArray(context.interdependencies)) {
            complexities.push(`considering interdependencies: ${context.interdependencies.join(', ')}`);
        } else {
            complexities.push("examining potential interconnections between identified factors");
        }
        complexities.push("looking for emergent patterns or second-order effects");
        if (context?.tradeoffs && Array.isArray(context.tradeoffs)) {
            complexities.push(`evaluating tradeoffs: ${context.tradeoffs.join(', ')}`);
        } else {
            complexities.push("assessing potential tradeoffs between different objectives or solutions");
        }
        
        analysisText += `This deeper dive involves: ${complexities.map((c,i) => `${i+1}. ${c}`).join('; ')}. `;
        analysisText += "This should provide a richer understanding before synthesizing a conclusion.";
        return analysisText;
    }

    private generateSynthesis(thoughts: ThoughtStep[], relevantMemory: WorkingMemoryItem[], goal: string): string {
        const confidentThoughts = thoughts.filter(t => !t.metadata.isRevision && t.confidence > 0.6);
        const keyInsights = confidentThoughts
            .slice(-4) // Take up to last 4 confident, non-revision thoughts
            .map(t => this.extractMainPoint(t.content))
            .filter(Boolean); // Remove any empty strings
        
        let synthesisText = `Synthesizing the ${confidentThoughts.length} (out of ${thoughts.length}) confident thoughts regarding "${goal}". `;
        
        if (keyInsights.length > 0) {
            synthesisText += `Key insights extracted include: ${keyInsights.map((insight, i) => `(${i + 1}) "${insight}"`).join('; ')}. `;
        } else if (thoughts.length > 0) {
            const lastThought = thoughts[thoughts.length-1];
            synthesisText += `The most recent thought was "${this.extractMainPoint(lastThought.content)}". While confidence varied, this is the current endpoint. `;
        } else {
            synthesisText += "No significant insights to synthesize yet. ";
        }

        if (relevantMemory.length > 0) {
            synthesisText += `Relevant memories, such as "${this.extractMainPoint(relevantMemory[0].content)}", also inform this synthesis. `;
        }
        
        synthesisText += "This leads towards a cohesive understanding and a potential conclusion or next step.";
        return synthesisText;
    }



    private determineNextTest(hypothesis: HypothesisTest, lastThought: ThoughtStep): string {
        const testedAspects = hypothesis.evidence.concat(hypothesis.counterEvidence);
        return `Verify hypothesis implications for untested aspects`;
    }

    private determineNextConsideration(branch: ThoughtBranch): string {
        return `Examine implications and potential convergence with main analysis`;
    }

    private extractKeywords(text: string): string[] {
        return text.split(/\W+/)
            .filter(word => word.length > 4)
            .slice(0, 3);
    }

    private extractMainPoint(text: string): string {
        return text.split('.')[0];
    }

    private calculateProblemComplexity(problem: string): number {
        let complexity = 0.5; // Base complexity
        
        // Increase complexity based on problem characteristics
        if (problem.length > 100) complexity += 0.1;
        if (problem.includes('multiple') || problem.includes('several')) complexity += 0.1;
        if (problem.includes('analyze') || problem.includes('compare')) complexity += 0.2;
        if (problem.includes('optimize') || problem.includes('best')) complexity += 0.2;
        if (problem.includes('design') || problem.includes('create')) complexity += 0.2;
        
        return Math.min(1.0, complexity);
    }

    private estimateThoughtConfidence(thinking: SequentialThinking, thoughtContent: string): number {
        let confidence = 0.7; // Base confidence
        
        // Increase confidence as we progress through structured thinking
        if (thinking.currentThought > 3) confidence += 0.1;
        if (thinking.currentThought > 5) confidence += 0.1;
        
        // Decrease confidence for revisions
        if (thinking.metadata.totalRevisions > 0) confidence -= 0.1;
        
        return Math.max(0.3, Math.min(0.95, confidence));
    }

    private assessNeedForMoreThoughts(thinking: SequentialThinking): boolean {
            const MIN_THOUGHTS_FOR_COMPLETION = 4; // Minimum thoughts before considering completion
            const CONFIDENCE_THRESHOLD_FOR_STAGE = 0.65; // Minimum confidence for a thought to count towards a stage
    
            // Always need more thoughts if below a certain count, unless maxThoughts is very low
            if (thinking.currentThought < Math.min(MIN_THOUGHTS_FOR_COMPLETION, thinking.totalThoughtsEstimate -1 )) {
                return true;
            }
    
            // If max thoughts reached (or about to be), no more thoughts needed
            if (thinking.currentThought >= (thinking.totalThoughtsEstimate -1)) { // -1 to allow for a concluding thought
                return false;
            }
    
            const confidentThoughts = thinking.thoughts.filter(t => t.confidence >= CONFIDENCE_THRESHOLD_FOR_STAGE && !t.metadata.isRevision);
    
            // Check if key reasoning stages are covered by confident thoughts
            const hasAnalysis = confidentThoughts.some(t =>
                t.content.toLowerCase().includes('analyze') ||
                t.content.toLowerCase().includes('consider') ||
                t.content.toLowerCase().includes('break down') ||
                t.content.toLowerCase().includes('initial thoughts')
            );
            const hasSolutionApproach = confidentThoughts.some(t =>
                t.content.toLowerCase().includes('approach') ||
                t.content.toLowerCase().includes('method') ||
                t.content.toLowerCase().includes('strategy') ||
                t.content.toLowerCase().includes('solution')
            );
            const hasEvaluation = confidentThoughts.some(t =>
                t.content.toLowerCase().includes('evaluate') ||
                t.content.toLowerCase().includes('pros and cons') ||
                t.content.toLowerCase().includes('assess') ||
                t.content.toLowerCase().includes('critique')
            );
    
            if (!(hasAnalysis && hasSolutionApproach && hasEvaluation)) {
                // If core stages aren't confidently covered, need more thoughts
                return true;
            }
    
            // If hypotheses are active and any are still pending, need more thoughts
            if (thinking.hypotheses.length > 0) {
                const pendingHypotheses = thinking.hypotheses.some(h => h.status === 'forming' || h.status === 'testing');
                if (pendingHypotheses) {
                    return true;
                }
            }
    
            // If active branches are not yet resolved, might need more thoughts (or dedicated branch processing)
            const unresolvedBranches = thinking.branches.some(b => !b.outcome || b.outcome.confidence < CONFIDENCE_THRESHOLD_FOR_STAGE);
            if (unresolvedBranches) {
                // This might also be handled by specific branch exploration logic
                // For now, let's say it contributes to needing more thoughts in the main line if not handled by branch logic
                // return true; // Potentially re-enable if branch exploration isn't robust enough
            }
    
    
            // Advanced: Check if the goal's keywords are sufficiently addressed in confident thoughts
            // This is a simple check; more advanced NLP could be used.
            const goalKeywords = thinking.goal.toLowerCase().split(/\W+/).filter(kw => kw.length > 3);
            const coveredKeywords = new Set<string>();
            confidentThoughts.forEach(t => {
                const thoughtKeywords = t.content.toLowerCase().split(/\W+/);
                goalKeywords.forEach(gk => {
                    if (thoughtKeywords.includes(gk)) {
                        coveredKeywords.add(gk);
                    }
                });
            });
    
            // If less than, say, 70% of unique goal keywords are covered by confident thoughts, need more.
            if (goalKeywords.length > 0 && (coveredKeywords.size / new Set(goalKeywords).size) < 0.7) {
                return true;
            }
    
            // If all checks pass, we might not need more thoughts
            return false;
        }


    private async synthesizeFinalAnswer(thinking: SequentialThinking): Promise<string> {
        let finalAnswer = "After careful consideration, ";
        const relevantThoughts = thinking.thoughts
            .filter(t => !t.metadata.isRevision && t.confidence > 0.6) // Prioritize confident, non-revision thoughts
            .sort((a, b) => b.confidence - a.confidence); // Sort by confidence

        if (relevantThoughts.length === 0) {
            return "I was unable to reach a definitive conclusion based on the thinking process.";
        }

        // Attempt to find a concluding thought
        const concludingThought = relevantThoughts.find(t =>
            t.content.toLowerCase().includes("conclusion is") ||
            t.content.toLowerCase().includes("therefore, i conclude") ||
            t.content.toLowerCase().includes("my final answer is") ||
            t.content.toLowerCase().includes("synthesize my thoughts") ||
            t.content.toLowerCase().includes("leads to a cohesive understanding")
        );

        if (concludingThought) {
            finalAnswer += `my primary conclusion, based on the thought "${this.extractMainPoint(concludingThought.content)}", is that... `;
        } else {
            finalAnswer += "my analysis suggests that... ";
        }

        // Summarize key insights from the top 2-3 relevant thoughts
        const keyInsights = relevantThoughts.slice(0, Math.min(3, relevantThoughts.length))
            .map(t => this.extractMainPoint(t.content));

        if (keyInsights.length > 0) {
            finalAnswer += `Key insights include: ${keyInsights.join("; ")}. `;
        }

        // Incorporate outcomes from successful hypotheses if any
        const successfulHypotheses = thinking.hypotheses.filter(h => h.status === 'verified' && h.confidence > 0.7);
        if (successfulHypotheses.length > 0) {
            finalAnswer += `This is supported by the confirmed hypothesis: "${successfulHypotheses[0].hypothesis}". `;
        }

        // Incorporate insights from significant branches if any
        const significantBranches = thinking.branches.filter(b => b.outcome && b.outcome.confidence > 0.7);
        
        if (significantBranches.length > 0) {
            const outcome = significantBranches?.[0]?.outcome;
            if (outcome && outcome.summary) {
                finalAnswer += `Exploring alternative perspectives, such as "${significantBranches[0].description}", also yielded relevant insights like "${this.extractMainPoint(outcome.summary)}". `;
            }
        }

        // Fallback: if no strong concluding thought, use the last high-confidence thought
        if (!concludingThought && relevantThoughts.length > 0) {
             finalAnswer += `The most pertinent thought leading to this is: "${this.extractMainPoint(relevantThoughts[0].content)}".`;
        } else if (relevantThoughts.length === 0 && thinking.thoughts.length > 0) {
            // If no relevant (high confidence, non-revision) thoughts, use the very last thought as a fallback
            finalAnswer = `The thinking process concluded with the thought: "${this.extractMainPoint(thinking.thoughts[thinking.thoughts.length - 1].content)}". A more definitive answer requires further analysis.`;
        }


        // Placeholder for a more sophisticated NLP-based summarization
        if (finalAnswer.length < 50 && relevantThoughts.length > 0) { // If synthesis is too short
            finalAnswer = `Based on the sequential analysis, the main points are: ${keyInsights.join('. ')}. Therefore, the synthesized answer points towards [a more detailed summary of the problem solution based on these points].`;
        } else if (finalAnswer.length > 500) { // Truncate if too long
            finalAnswer = finalAnswer.substring(0, 497) + "...";
        }


        return finalAnswer.trim();
    }

    private calculateOverallConfidence(thinking: SequentialThinking): number {
        if (thinking.thoughts.length === 0) return 0;
        
        const avgConfidence = thinking.thoughts.reduce((sum, t) => sum + t.confidence, 0) / thinking.thoughts.length;
        
        // Adjust based on revisions and completeness
        let adjustedConfidence = avgConfidence;
        if (thinking.metadata.totalRevisions > 0) adjustedConfidence -= 0.1;
        if (thinking.currentThought >= 5) adjustedConfidence += 0.1;
        
        return Math.max(0.1, Math.min(0.95, adjustedConfidence));
    }

    private generateReasoningExplanation(thinking: SequentialThinking): string {
        return `Conducted ${thinking.currentThought} sequential thoughts with ${thinking.metadata.totalRevisions} revisions. ` +
               `Problem complexity: ${thinking.metadata.complexityScore.toFixed(2)}. ` +
               `Used ${thinking.branches.length} branching points for comprehensive analysis.`;
    }

    private extractSolutionPath(thinking: SequentialThinking): number[] {
        return thinking.thoughts
            .filter(t => !t.metadata.isRevision)
            .map(t => t.thoughtNumber);
    }

    private async considerBranching(thinking: SequentialThinking): Promise<void> {
        // Simple branching implementation - could be enhanced
        thinking.metadata.branchingPoints++;
        
        await this.addThought(thinking,
            `Let me explore an alternative perspective on this problem to ensure I'm not missing important considerations.`,
            false, 0.7
        );
    }

    private async generateHypothesis(thinking: SequentialThinking): Promise<void> {
        const hypothesis: HypothesisTest = {
            id: `hypothesis-${Date.now()}`,
            hypothesis: "Based on my analysis, I hypothesize that [specific hypothesis would be generated]",
            evidence: [],
            counterEvidence: [],
            confidence: 0.6,
            status: 'forming',
            timestamp: Date.now()
        };
        
        thinking.hypotheses.push(hypothesis);
        
        await this.addThought(thinking,
            `I'm forming a hypothesis: ${hypothesis.hypothesis}. Let me gather evidence to test this.`,
            false, 0.7
        );
    }

    private async storeThoughtInKnowledgeGraph(thinking: SequentialThinking, thought: ThoughtStep): Promise<void> {
        // Store thought as an entity in the knowledge graph for future reference
        const entityName = `thought-${thinking.id}-${thought.thoughtNumber}`;
        
        const entity: Entity = {
            id: thought.id,
            name: entityName,
            type: 'thought',
            observations: [thought.content],
            metadata: {
                created: thought.timestamp,
                lastUpdated: thought.timestamp,
                relevanceScore: thought.confidence,
                accessCount: 0
            }
        };
          this.cognitiveState.workingMemory.knowledgeGraph.entities.set(entityName, entity);
        this.cognitiveState.workingMemory.knowledgeGraph.metadata.totalEntities++;
        this.cognitiveState.workingMemory.knowledgeGraph.metadata.lastUpdated = Date.now();
    }

    // ReAct Action-Observation Cycle Handlers
    private async handleReActStartSession(args: any): Promise<any> {
        const input = args as ReActInput;
        
        const sessionId = `react-session-${Date.now()}`;
        const actionPlan: ActionPlan = {
            id: `plan-${sessionId}`,
            goal: input.goal,
            actions: [],
            currentActionIndex: 0,
            status: 'planning',
            startTime: Date.now(),
            lastUpdated: Date.now()
        };

        const session: ReActSession = {
            id: sessionId,
            goal: input.goal,
            cycles: [],
            actionPlan,
            status: 'active',
            startTime: Date.now(),
            learningsSummary: [],
            lastUpdated: 0
        };

        this.cognitiveState.activeReActSessions.push(session);

        // Initial planning phase
        await this.planInitialActions(session, input);

        return {
            content: [{
                type: 'text',
                text: JSON.stringify({
                    sessionId: session.id,
                    goal: session.goal,
                    status: session.status,
                    initialPlan: session.actionPlan,
                    message: `ReAct session started for goal: "${input.goal}". Ready to execute action cycles.`
                }, null, 2)
            }]
        };
    }

    private async handleReActExecuteAction(args: any): Promise<any> {
        const { sessionId, actionType, actionName, parameters = {}, reasoning } = args;
        
        const session = this.cognitiveState.activeReActSessions.find(s => s.id === sessionId);
        if (!session) {
            throw new Error(`ReAct session ${sessionId} not found`);
        }

        // Create action
        const action: Action = {
            id: `action-${Date.now()}`,
            type: actionType,
            name: actionName,
            parameters,
            expectedOutcome: `Expected outcome for ${actionName}`,
            confidence: 0.8,
            timestamp: Date.now()
        };

        // Simulate action execution
        const observation = await this.executeAction(action, session, args.simulationMode || false);
        
        // Create ReAct cycle
        const cycle: ReActCycle = {
            id: `cycle-${Date.now()}`,
            reasoning,
            action,
            observation,
            reflection: await this.generateReflection(action, observation, session),
            nextStepPlan: await this.planNextStep(session, observation),
            timestamp: Date.now(),
            confidence: (action.confidence + observation.confidence) / 2
        };

        session.cycles.push(cycle);
        this.cognitiveState.actionHistory.push(action);
        this.cognitiveState.observationHistory.push(observation);

        // Store learnings
        await this.updateLearningsFromCycle(cycle, session);

        return {
            content: [{
                type: 'text',
                text: JSON.stringify({
                    cycle: {
                        id: cycle.id,
                        reasoning: cycle.reasoning,
                        action: {
                            name: action.name,
                            type: action.type,
                            parameters: action.parameters
                        },
                        observation: {
                            outcome: observation.outcome,
                            success: observation.success,
                            learningPoints: observation.learningPoints
                        },
                        reflection: cycle.reflection,
                        nextStepPlan: cycle.nextStepPlan,
                        confidence: cycle.confidence
                    },
                    sessionStatus: {
                        cyclesCompleted: session.cycles.length,
                        status: session.status
                    }
                }, null, 2)
            }]
        };
    }

    private async handleReActReflect(args: any): Promise<any> {
        const { sessionId, reflection, strategicAdjustments = [] } = args;
        
        const session = this.cognitiveState.activeReActSessions.find(s => s.id === sessionId);
        if (!session) {
            throw new Error(`ReAct session ${sessionId} not found`);
        }

        const reflectionResult = await this.performSessionReflection(session, reflection, strategicAdjustments);
        
        // Apply strategic adjustments
        if (strategicAdjustments.length > 0) {
            await this.applyStrategicAdjustments(session, strategicAdjustments);
        }

        // Check if goal is achieved
        const goalAchieved = await this.assessGoalCompletion(session);
        if (goalAchieved) {
            session.status = 'completed';
            session.endTime = Date.now();
            session.finalOutcome = "Goal successfully achieved through ReAct cycles";
        }

        return {
            content: [{
                type: 'text',
                text: JSON.stringify({
                    reflection: reflectionResult,
                    sessionUpdate: {
                        status: session.status,
                        totalCycles: session.cycles.length,
                        learningsSummary: session.learningsSummary,
                        goalAchieved,
                        strategicAdjustments: strategicAdjustments
                    }
                }, null, 2)
            }]
        };
    }

    private createDefaultConstitutionalFramework(): ConstitutionalFramework {
        return {
            id: 'default-framework',
            name: 'Default Constitutional Framework',
            description: 'Provides basic reasoning principles.',
            principles: [],
            version: '1.0',
            created: Date.now(),
            lastUpdated: Date.now(),
        };
    }

    private async handleConstitutionalAssess(input: ConstitutionalInput): Promise<any> {
        try {
            const { targetId, targetType, frameworkId, includeCorrections = true, autoApplyCorrections = false } = input;
            let target: any;

            // Find the target for assessment
            switch (targetType) {
                case 'reasoning_chain':
                    target = this.cognitiveState.activeReasoningChains.find(rc => rc.id === targetId) || 
                             this.cognitiveState.assessmentHistory.find(ah => ah.targetId === targetId && ah.targetType === 'reasoning_chain'); // Check history too
                    break;
                case 'sequential_thinking':
                    target = this.cognitiveState.activeSequentialThinking.find(st => st.id === targetId) ||
                             this.cognitiveState.assessmentHistory.find(ah => ah.targetId === targetId && ah.targetType === 'sequential_thinking');
                    break;
                case 'react_cycle': // Assessing a specific cycle
                    for (const session of this.cognitiveState.activeReActSessions) {
                        target = session.cycles.find(c => c.id === targetId);
                        if (target) break;
                    }
                    if (!target) {
                         for (const session of this.cognitiveState.cycleHistory) { // Check historical cycles
                            if (session.id === targetId) { // Assuming cycleHistory stores individual cycles with IDs
                                target = session;
                                break;
                            }
                        }
                    }
                    break;
                default:
                    return { content: [{ type: 'text', text: `Error: Unknown target type for assessment: ${targetType}` }], isError: true };
            }

            if (!target) {
                return { content: [{ type: 'text', text: `Error: Target ${targetType} with ID ${targetId} not found for assessment.` }], isError: true };
            }

            const framework = frameworkId
                ? this.cognitiveState.constitutionalFramework // Assuming only one framework for now, or needs lookup
                : this.cognitiveState.constitutionalFramework;

            if (!framework) {
                return { content: [{ type: 'text', text: `Error: Constitutional framework with ID ${frameworkId || 'default'} not found.` }], isError: true };
            }
            
            const assessment = await this.performConstitutionalAssessment(target, framework, targetType);
            this.cognitiveState.assessmentHistory.push(assessment);

            let corrections: CorrectionSuggestion[] = [];
            if (includeCorrections) {
                corrections = await this.generateCorrections(assessment);
                if (autoApplyCorrections && corrections.length > 0) {
                    await this.applyCorrections(corrections, target, assessment); // Pass assessment here
                    assessment.critique += `\nAuto-applied ${corrections.length} corrections.`;
                    // Re-assess after applying corrections (optional, can be complex)
                    // assessment = await this.performConstitutionalAssessment(target, framework, targetType);
                }
            }
            
            const output: ConstitutionalOutput = {
                assessment,
                corrections,
                metrics: await this.calculateQualityMetrics({ start: Date.now() - 86400000, end: Date.now() }), // Example: last 24h
                recommendations: this.generateRecommendations(assessment),
                improvementPlan: this.generateImprovementPlan(assessment, corrections),
                result: `Assessment of ${targetType} ${targetId} completed. Overall score: ${assessment.overallScore.toFixed(2)} (${assessment.overallEvaluation}).`,
                reasoning: [`Assessed based on ${framework.principles.length} principles.`],
                constitutional_check: assessment.overallScore > (framework.principles.find(p => p.thresholds)?.thresholds?.acceptable ?? 0.6),// Example threshold
                violations: assessment.principleAssessments.flatMap(pa => pa.flaws.map(f => `${pa.principleId}: ${f.description}`)),
                confidence: assessment.principleAssessments.reduce((sum, pa) => sum + pa.confidence, 0) / (assessment.principleAssessments.length || 1)
            };

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(output, null, 2)
                }]
            };
        } catch (error: any) {
            console.error('Error during constitutional assessment:', error);
            return {
                content: [{
                    type: 'text',
                    text: `Constitutional assessment failed: ${error.message}`
                }],
                isError: true
            };
        }
    }

    private async handleConstitutionalCritique(args: any): Promise<any> {
        try {
            const { goal, targetIds = [], timeframe } = args;

            // Create critique session
            const session: CritiqueSession = {
                id: `critique_${Date.now()}`,
                goal,
                targetAssessments: [],
                overallMetrics: await this.calculateQualityMetrics(timeframe),
                recommendations: [],
                correctionsPlan: [],
                status: 'active',
                startTime: Date.now(),
                learnings: []
            };

            // Assess all targets
            for (const targetId of targetIds) {
                const assessmentInput: ConstitutionalInput = {
                    targetId,
                    includeCorrections: true,
                    autoApplyCorrections: false,
                    frameworkId: undefined,
                    targetType: '',

                };
                const assessmentResult = await this.handleConstitutionalAssess(assessmentInput);
                if (assessmentResult.content[0].text !== 'No target found for constitutional assessment') {
                    const output = JSON.parse(assessmentResult.content[0].text) as ConstitutionalOutput;
                    session.targetAssessments.push(output.assessment);
                    session.correctionsPlan.push(...output.corrections);
                }
            }

            // Generate session-level recommendations
            session.recommendations = this.generateSessionRecommendations(session);
            session.status = 'completed';
            session.endTime = Date.now();

            // Store critique session
            this.cognitiveState.activeCritiqueSessions.push(session);

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(session, null, 2)
                }]
            };

        } catch (error) {
            return {
                content: [{
                    type: 'text',
                    text: `Error in constitutional critique: ${error instanceof Error ? error.message : 'Unknown error'}`
                }]
            };
        }
    }

    private async handleConstitutionalMetrics(args: any): Promise<any> {
        try {
            const { timeframe, metricTypes = [] } = args;

            const metrics = await this.calculateQualityMetrics(timeframe);
            
            // Filter metrics if specific types requested
            let filteredMetrics = metrics;
            if (metricTypes.length > 0) {
                // Create filtered version based on requested types
                filteredMetrics = {
                    ...metrics,
                    commonFlaws: metrics.commonFlaws.filter(flaw => 
                        metricTypes.includes(flaw.type) || metricTypes.includes('commonFlaws')),
                    improvementTrends: metrics.improvementTrends.filter(trend => 
                        metricTypes.includes(trend.principle) || metricTypes.includes('improvementTrends'))
                };
            }

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(filteredMetrics, null, 2)
                }]
            };

        } catch (error) {
            return {
                content: [{
                    type: 'text',
                    text: `Error getting constitutional metrics: ${error instanceof Error ? error.message : 'Unknown error'}`
                }]
            };
        }
    }

    private async performConstitutionalAssessment(target: any, framework: ConstitutionalFramework, targetType: string): Promise<SelfAssessment> {
        const principleAssessments: any[] = [];
        let totalScore = 0;

        for (const principle of framework.principles) {
            const assessment = await this.assessPrinciple(target, principle, targetType);
            principleAssessments.push(assessment);
            totalScore += assessment.score * principle.weight;
        }

        const normalizedScore = totalScore / framework.principles.reduce((sum, p) => sum + p.weight, 0);
        const evaluation = this.scoreToEvaluation(normalizedScore);

        return {
            id: `assessment_${Date.now()}`,
            targetId: target.id || 'unknown',
            targetType: targetType as any,
            frameworkId: framework.id,
            overallScore: normalizedScore,
            overallEvaluation: evaluation,
            principleAssessments,
            totalFlaws: principleAssessments.reduce((sum, pa) => sum + pa.flaws.length, 0),
            totalSuggestions: principleAssessments.reduce((sum, pa) => sum + pa.suggestions.length, 0),
            timestamp: Date.now(),
            assessmentDuration: 0,
            critique: `Assessment completed with score ${normalizedScore.toFixed(2)}. No specific strengths, weaknesses, or suggestions identified.`
        };
    }

// ...existing code...
    private async assessPrinciple(target: any, principle: ReasoningPrinciple, targetType: string): Promise<PrincipleAssessment> {
        // Simple heuristic-based assessment - in production this would use more sophisticated analysis
        let score = 0.7; // Default optimistic score
        const flaws: ReasoningFlaw[] = [];
        const suggestions: CorrectionSuggestion[] = [];
        const targetContent = JSON.stringify(target).toLowerCase(); // For keyword spotting

        // Analyze based on principle type and target content
        if (principle.id === 'logical_consistency') {
            score = this.analyzeLogicalConsistency(target);
            if (score < (principle.thresholds?.acceptable || 0.5)) {
                flaws.push({ id: `flaw_${Date.now()}`, type: 'inconsistency', description: 'Potential logical inconsistency detected.', severity: 'medium', location: 'overall', evidence: [], confidence: 1 - score });
            }
        } else if (principle.id === 'evidence_based') {
            score = this.analyzeEvidenceBasis(target);
            if (score < (principle.thresholds?.acceptable || 0.5)) {
                flaws.push({ id: `flaw_${Date.now()}`, type: 'missing_evidence', description: 'Insufficient evidence cited or implied.', severity: 'medium', location: 'overall', evidence: [], confidence: 1 - score });
            }
        } else if (principle.id === 'completeness') {
            score = this.analyzeCompleteness(target);
            if (score < (principle.thresholds?.acceptable || 0.5)) {
                flaws.push({ id: `flaw_${Date.now()}`, type: 'incomplete_analysis', description: 'Analysis appears incomplete.', severity: 'low', location: 'overall', evidence: [], confidence: 1 - score });
            }
        } else if (principle.id === 'clarity') {
            score = this.analyzeClarity(target);
            if (score < (principle.thresholds?.acceptable || 0.5)) {
                flaws.push({ id: `flaw_${Date.now()}`, type: 'unclear_reasoning', description: 'Reasoning or expression lacks clarity.', severity: 'low', location: 'overall', evidence: [], confidence: 1 - score });
            }
        } else if (principle.id === 'bias_awareness') {
            score = this.analyzeBiasAwareness(target);
            if (score < (principle.thresholds?.acceptable || 0.5)) {
                flaws.push({ id: `flaw_${Date.now()}`, type: 'bias', description: 'Potential unacknowledged bias.', severity: 'medium', location: 'overall', evidence: [], confidence: 1 - score });
            }
        }
        // Add more principle checks here

        // Generate generic suggestions if flaws are found
        if (flaws.length > 0 && score < (principle.thresholds?.good || 0.7)) {
            suggestions.push({
                id: `suggestion_${Date.now()}`,
                flawId: flaws[0]?.id || 'general', // Link to the first flaw for simplicity
                type: 'general_improvement',
                description: `Consider reviewing ${principle.name}. Specific areas might need refinement.`,
                actionable: true,
                priority: 'medium',
                expectedImprovement: 0.1,
                implementation: `Re-evaluate the content against the guidelines for ${principle.name}.`,
                suggestedChange: "Review and refine based on principle guidelines."
            });
        }


        const evaluation = this.scoreToEvaluation(score, principle.thresholds);

        return {
            principleId: principle.id,
            score,
            evaluation,
            evidence: [`Assessed ${targetType} content against principle: ${principle.name}`],
            flaws,
            suggestions,
            confidence: 0.75 // Confidence in the assessment itself
        };
    }


    analyzeEvidenceBasis(target: any): number {
        const content = JSON.stringify(target).toLowerCase();
        let score = 0.4; // Start lower, as evidence is crucial

        const evidenceKeywords = ['evidence', 'source', 'study', 'research', 'data', 'according to', 'shows that', 'indicates that', 'proven by'];
        const citationPatterns = [/\bcites\b/i, /\b(fig\.|figure|table)\s*\d+/i, /\[\d+\]/i, /\(.*\d{4}\)/i]; // Basic citation patterns

        let evidenceMentions = 0;
        for (const keyword of evidenceKeywords) {
            if (content.includes(keyword)) {
                evidenceMentions++;
            }
        }
        for (const pattern of citationPatterns) {
            if (pattern.test(content)) {
                evidenceMentions++;
            }
        }

        if (evidenceMentions > 0) score += 0.2;
        if (evidenceMentions > 2) score += 0.2;
        if (evidenceMentions > 4) score += 0.1;

        // Penalize if claims are made without apparent support
        const claimKeywords = ['clearly', 'obvious', 'undoubtedly', 'proven fact'];
        let unsupportedClaims = 0;
        for (const keyword of claimKeywords) {
            if (content.includes(keyword) && evidenceMentions === 0) {
                unsupportedClaims++;
            }
        }
        if (unsupportedClaims > 0) score -= 0.2;
        if (unsupportedClaims > 1) score -= 0.1;


        return Math.max(0, Math.min(1, score));
    }

    private analyzeLogicalConsistency(target: any): number {
        // Simple heuristic: check for basic consistency indicators
        const content = JSON.stringify(target).toLowerCase();
        let score = 0.8; // Start with a relatively high base
        
        // Penalize contradictions or inconsistencies
        if (content.includes('contradict') || content.includes('inconsistent') || content.includes('however, this conflicts')) score -= 0.4;
        
        // Reward logical connectors if used appropriately (simple check)
        if (content.includes('therefore') || content.includes('because') || content.includes('hence') || content.includes('consequently')) score += 0.1;
        
        // Penalize if it seems to jump to conclusions without clear steps (very basic check)
        if ((content.includes('conclusion is') || content.includes('final answer is')) && content.length < 200 && !content.includes('step')) score -= 0.1;

        // Check for self-correction or acknowledgement of uncertainty as positive signs
        if (content.includes('revising my previous statement') || content.includes('on second thought') || content.includes('it is possible that')) score += 0.05;

        return Math.max(0, Math.min(1, score)); // Ensure score is between 0 and 1
    }

    private analyzeCompleteness(target: any): number {
        const content = JSON.stringify(target);
        let score = 0.6;
        
        // Simple heuristic based on content length and structure
        if (content.length > 500) score += 0.2;
        if (content.length > 1000) score += 0.1;
        
        return Math.max(0, Math.min(1, score));
    }

    private analyzeClarity(target: any): number {
        const content = JSON.stringify(target);
        let score = 0.7;
        
        // Simple heuristic based on structure and length
        const sentences = content.split('.').length;
        if (sentences > 3) score += 0.1;
        if (content.length > 200) score += 0.1;
        
        return Math.max(0, Math.min(1, score));
    }

    private analyzeBiasAwareness(target: any): number {
        const content = JSON.stringify(target).toLowerCase();
        let score = 0.6;
        
        if (content.includes('perspective') || content.includes('viewpoint') || content.includes('consider')) score += 0.2;
        if (content.includes('always') || content.includes('never') || content.includes('all')) score -= 0.1;
        
        return Math.max(0, Math.min(1, score));
    }

    private scoreToEvaluation(score: number, thresholds?: { excellent: number, good: number, acceptable: number, poor: number }): 'excellent' | 'good' | 'acceptable' | 'poor' {
        const t = thresholds || { excellent: 0.8, good: 0.6, acceptable: 0.4, poor: 0.0 };
        if (score >= t.excellent) return 'excellent';
        if (score >= t.good) return 'good';
        if (score >= t.acceptable) return 'acceptable';
        return 'poor';
    }

    private async generateCorrections(assessment: SelfAssessment): Promise<CorrectionSuggestion[]> {
        const corrections: CorrectionSuggestion[] = [];

        for (const principleAssessment of assessment.principleAssessments) {
            if (principleAssessment.score < (this.cognitiveState.constitutionalFramework.principles.find(p => p.id === principleAssessment.principleId)?.thresholds?.good || 0.6)) {
                for (const flaw of principleAssessment.flaws) {
                    const suggestion: CorrectionSuggestion = {
                        id: `correction_sugg_${flaw.id}_${Date.now()}`,
                        flawId: flaw.id,
                        type: this.mapFlawToCorrectionType(flaw.type),
                        description: `Address ${flaw.type}: ${flaw.description}. Consider revising the section at '${flaw.location}'.`,
                        actionable: true,
                        priority: flaw.severity === 'critical' || flaw.severity === 'high' ? 'high' : (flaw.severity === 'medium' ? 'medium' : 'low'),
                        expectedImprovement: flaw.severity === 'critical' || flaw.severity === 'high' ? 0.3 : (flaw.severity === 'medium' ? 0.2 : 0.1),
                        implementation: `Review the content related to '${flaw.location}' focusing on ${principleAssessment.principleId}. ${this.getGuidanceForFlaw(flaw.type)}`,
                        targetComponent: flaw.location, // e.g., a specific thought ID or section
                        suggestedChange: `Refine content at '${flaw.location}' to better align with ${principleAssessment.principleId}. For example, if it's a logical_fallacy, rephrase the argument.`
                    };
                    corrections.push(suggestion);
                }
            }
        }
        return corrections;
    }

 private mapFlawToCorrectionType(flawType: ReasoningFlaw['type']): CorrectionSuggestion['type'] {
        switch (flawType) {
            case 'logical_fallacy': return 'logical_restructure';
            case 'missing_evidence': return 'gather_evidence';
            case 'bias': return 'bias_mitigation';
            case 'inconsistency': return 'logical_restructure';
            case 'incomplete_analysis': return 'complete_analysis';
            case 'circular_reasoning': return 'logical_restructure';
            case 'unclear_reasoning': return 'general_improvement'; // Added
            case 'potential_bias': return 'bias_mitigation';       // Added
            // case 'complete_analysis': return 'general_improvement'; // If 'complete_analysis' is a flaw, map it
            default:
                console.warn(`Unknown flawType in mapFlawToCorrectionType: ${flawType}`);
                return 'general_improvement';
        }
    }

    private getGuidanceForFlaw(flawType: ReasoningFlaw['type']): string {
        switch (flawType) {
            case 'logical_fallacy': return "Identify the fallacy and rephrase the argument to be logically sound.";
            case 'missing_evidence': return "Provide supporting data, sources, or examples for claims made.";
            case 'bias': return "Acknowledge potential biases and consider alternative perspectives.";
            case 'inconsistency': return "Resolve contradictory statements or ensure consistent terminology/logic.";
            case 'incomplete_analysis': return "Explore additional facets of the topic or consider unaddressed factors.";
            case 'circular_reasoning': return "Ensure the conclusion is not merely a restatement of the premise; provide independent support.";
            case 'unclear_reasoning': return "Rephrase for clarity, define terms, or simplify complex sentences."; // Added
            case 'potential_bias': return "Explicitly state potential biases and how they might influence reasoning. Consider counter-arguments."; // Added
            // case 'complete_analysis': return "Review if any aspects were oversimplified or if the analysis is truly finished."; // If 'complete_analysis' is a flaw
            default:
                console.warn(`Unknown flawType in getGuidanceForFlaw: ${flawType}`);
                return "Review the section for general clarity, coherence, and accuracy.";
        }
    }

    private async applyCorrections(corrections: CorrectionSuggestion[], target: any, assessment: SelfAssessment): Promise<void> {
        if (!target || !target.id) {
            console.warn('Cannot apply corrections: Target or target ID is missing.');
            return;
        }
        console.log(`Attempting to apply ${corrections.length} corrections to target ${target.id} of type ${target.constructor?.name || typeof target}`);

        let changesApplied = 0;

        for (const correction of corrections) {
            if (!correction.actionable) continue;

            console.log(`Applying correction: ${correction.description} (Priority: ${correction.priority})`);
            let appliedThisCorrection = false;

            // Attempt to apply based on target type and correction details
            if (target.thoughts && Array.isArray(target.thoughts) && correction.targetComponent?.startsWith('thought-')) {
                // Target is likely SequentialThinking, correction targets a specific thought
                const thoughtId = correction.targetComponent;
                const thoughtIndex = target.thoughts.findIndex((t: ThoughtStep) => t.id === thoughtId);
                if (thoughtIndex !== -1) {
                    const originalThought = target.thoughts[thoughtIndex].content;
                    // Simplistic application: append a note or try to modify if simple.
                    // A real system would need NLP to "apply" the suggestedChange.
                    target.thoughts[thoughtIndex].content += ` [Correction Applied: ${correction.suggestedChange.substring(0,100)}...]`;
                    target.thoughts[thoughtIndex].metadata.correctionDetails = target.thoughts[thoughtIndex].metadata.correctionDetails || [];
                    target.thoughts[thoughtIndex].metadata.correctionDetails.push({
                        correctionId: correction.id,
                        appliedAt: Date.now(),
                        originalContentHint: originalThought.substring(0, 50)
                    });
                    appliedThisCorrection = true;
                    console.log(`Applied correction to thought ${thoughtId}`);
                }
            } else if (target.cycles && Array.isArray(target.cycles) && correction.targetComponent?.startsWith('cycle-')) {
                // Target is likely ReActSession, correction targets a specific cycle
                const cycleId = correction.targetComponent;
                const cycleIndex = target.cycles.findIndex((c: ReActCycle) => c.id === cycleId);
                if (cycleIndex !== -1) {
                    // Simplistic: Add to reflection or a new "correction_note" field
                    target.cycles[cycleIndex].reflection += `\n[Correction Applied: ${correction.suggestedChange.substring(0,100)}...]`;
                    // Or add a dedicated field if ReActCycle type supports it
                    // target.cycles[cycleIndex].metadata = target.cycles[cycleIndex].metadata || {};
                    // target.cycles[cycleIndex].metadata.correctionDetails = ...
                    appliedThisCorrection = true;
                    console.log(`Applied correction note to ReAct cycle ${cycleId}`);
                }
            } else if (target.steps && Array.isArray(target.steps) && correction.targetComponent?.startsWith('step-')) {
                 // Target is likely ReasoningChain, correction targets a specific step
                const stepId = correction.targetComponent;
                const stepIndex = target.steps.findIndex((s: ReasoningStep) => s.id === stepId);
                if (stepIndex !== -1) {
                    target.steps[stepIndex].reasoning += ` [Correction Applied: ${correction.suggestedChange.substring(0,100)}...]`;
                     target.steps[stepIndex].metadata.correctionDetails = target.steps[stepIndex].metadata.correctionDetails || [];
                    target.steps[stepIndex].metadata.correctionDetails.push({
                        correctionId: correction.id,
                        appliedAt: Date.now(),
                    });
                    appliedThisCorrection = true;
                    console.log(`Applied correction to reasoning step ${stepId}`);
                }
            }
             else {
                // General application to a field if target is a simple object and component is a key
                if (typeof target === 'object' && target !== null && correction.targetComponent && target[correction.targetComponent] && typeof target[correction.targetComponent] === 'string') {
                    target[correction.targetComponent] += ` [Correction Applied: ${correction.suggestedChange.substring(0,100)}...]`;
                    appliedThisCorrection = true;
                    console.log(`Applied correction to field ${correction.targetComponent}`);
                } else if (typeof target.content === 'string') { // Fallback to a generic 'content' field
                    target.content += ` [Correction Applied: ${correction.suggestedChange.substring(0,100)}...]`;
                    appliedThisCorrection = true;
                    console.log(`Applied correction to generic content field of target ${target.id}`);
                }
            }


            if (appliedThisCorrection) {
                changesApplied++;
                // Log the application of correction
                const logEntry: AppliedCorrectionLogEntry = {
                    correctionId: correction.id, 
                    timestamp: Date.now(),
                    targetId: target.id,
                    targetType: target.constructor?.name || typeof target,
                    principleViolated: assessment.principleAssessments.find((pa: { flaws: any[]; principleId: string; }) => pa.flaws.some(f => f.id === correction.flawId))?.principleId || "unknown",
                    summary: correction.description
                };
                // You might want to add logEntry to a list or handle it
                // For example: this.cognitiveState.appliedCorrectionsLog.push(logEntry);

                this.cognitiveState.learningsLog.push({
                    id: `corr_log_${Date.now()}`,
                    timestamp: Date.now(),
                    message: `Applied correction ${correction.id} to ${target.id}.`,
                    sourceActionId: correction.id,
                    sourceActionName: 'applyCorrection',
                    sessionId: target.id, // Assuming target.id can serve as a session/item ID
                    tags: ['correction', 'constitutional_ai'],
                    severity: 'info'
                });
            }
        }

        if (changesApplied > 0) {
            target.lastUpdated = Date.now(); // Assuming target has lastUpdated
            if (target.status && target.status !== 'completed' && target.status !== 'failed') {
                // If it's an active process, mark it as revised or needing review
                if (target.status === 'active' || target.status === 'paused') {
                     // target.status = 'revised_after_assessment'; // Or a similar status if defined
                }
            }
            console.log(`Successfully applied ${changesApplied} corrections to target ${target.id}.`);
            // Potentially trigger re-assessment or notify user
        } else {
            console.log(`No corrections were directly applicable to target ${target.id} structure or no actionable corrections provided.`);
        }
    }

    private async calculateQualityMetrics(timeframe?: { start: number; end: number }): Promise<QualityMetrics> {
        const assessments = timeframe 
            ? this.cognitiveState.assessmentHistory.filter(a => 
                a.timestamp >= timeframe.start && a.timestamp <= timeframe.end)
            : this.cognitiveState.assessmentHistory;

        if (assessments.length === 0) {
            return {
                id: `metrics_${Date.now()}`,
                timeframe: timeframe || { start: Date.now() - 86400000, end: Date.now() },
                assessmentCount: 0,
                clarityScore: 0,
                unclear_reasoning: 0,
                averageScore: 0,
                scoreDistribution: { excellent: 0, good: 0, acceptable: 0, poor: 0 },
                commonFlaws: [],
                improvementTrends: [],
                correctionEffectiveness: { applied: 0, successful: 0, effectiveness: 0 }
            };
        }

        const averageScore = assessments.reduce((sum, a) => sum + a.overallScore, 0) / assessments.length;
        
        const distribution = { excellent: 0, good: 0, acceptable: 0, poor: 0 };
        assessments.forEach(a => distribution[a.overallEvaluation]++);

        // Calculate clarity score
        const clarityScores = assessments.map(a => a.principleAssessments.find(pa => pa.principleId === 'clarity')?.score || 0);
        const clarityScore = clarityScores.length > 0 ? clarityScores.reduce((sum, score) => sum + score, 0) / clarityScores.length : 0;

        // Calculate common flaws
        const allFlawsWithSeverity = assessments.flatMap(a => 
            a.principleAssessments.flatMap(pa => 
                pa.flaws.map(flaw => ({ type: flaw.type, severity: flaw.severity }))
            )
        );
        const flawCounts: { [key: string]: { count: number; severities: string[] } } = {};
        allFlawsWithSeverity.forEach(flaw => {
            if (!flawCounts[flaw.type]) {
                flawCounts[flaw.type] = { count: 0, severities: [] };
            }
            flawCounts[flaw.type].count++;
            flawCounts[flaw.type].severities.push(flaw.severity);
        });

        const commonFlaws = Object.entries(flawCounts)
            .sort(([, dataA], [, dataB]) => dataB.count - dataA.count)
            .slice(0, 5)
            .map(([type, data]) => {
                // Determine average severity (simplistic: mode or most common)
                const severityCounts: { [key: string]: number } = {};
                data.severities.forEach(s => severityCounts[s] = (severityCounts[s] || 0) + 1);
                const averageSeverity = Object.keys(severityCounts).sort((a,b) => severityCounts[b] - severityCounts[a])[0] || 'medium';

                return { 
                    type, 
                    frequency: data.count,
                    averageSeverity: averageSeverity as 'low' | 'medium' | 'high' | 'critical' // Cast if necessary
                };
            });

        // Calculate improvement trends (simplified - just overall score trend)
        const sortedAssessments = [...assessments].sort((a, b) => a.timestamp - b.timestamp);
        const improvementTrends = sortedAssessments.length > 1 ? [{
            principle: 'overall',
            changeRate: sortedAssessments[sortedAssessments.length - 1].overallScore - sortedAssessments[0].overallScore,
            trendDirection: (sortedAssessments[sortedAssessments.length - 1].overallScore - sortedAssessments[0].overallScore > 0.05) ? 'improving' as 'improving'
                          : (sortedAssessments[sortedAssessments.length - 1].overallScore - sortedAssessments[0].overallScore < -0.05) ? 'declining' as 'declining'
                          : 'stable' as 'stable',
        }] : [];

        const unclear_reasoning = assessments.reduce((count, a) => count + a.principleAssessments.filter(pa => pa.evaluation === 'poor' && pa.principleId === 'clarity').length, 0);

        return {
            id: `metrics_${Date.now()}`,
            timeframe: timeframe || { start: Date.now() - 86400000, end: Date.now() },
            assessmentCount: assessments.length,
            clarityScore,
            unclear_reasoning,
            averageScore,
            scoreDistribution: distribution,
            commonFlaws,
            improvementTrends,
            correctionEffectiveness: { applied: 0, successful: 0, effectiveness: 0.7 } // Placeholder
        };
    }

    private generateRecommendations(assessment: SelfAssessment): string[] {
        const recommendations: string[] = [];
        
        if (assessment.overallScore < 0.6) {
            recommendations.push('Overall reasoning quality needs improvement');
        }
        
        for (const pa of assessment.principleAssessments) {
            if (pa.score < 0.5) {
                recommendations.push(`Focus on improving ${pa.principleId}`);
            }
        }
        
        if (recommendations.length === 0) {
            recommendations.push('Continue maintaining high reasoning quality');
        }
        
        return recommendations;
    }

    private generateImprovementPlan(assessment: SelfAssessment, corrections: CorrectionSuggestion[]): string[] {
        const plan: string[] = [];
        
        plan.push('1. Review low-scoring principles from assessment');
        plan.push('2. Apply suggested corrections in order of priority');
        plan.push('3. Practice reasoning with constitutional principles in mind');
        plan.push('4. Regularly assess progress through constitutional evaluation');
        
        return plan;
    }

    private generateSessionRecommendations(session: CritiqueSession): string[] {
        const recommendations: string[] = [];
        
        if (session.targetAssessments.length > 0) {
            const avgScore = session.targetAssessments.reduce((sum, a) => sum + a.overallScore, 0) / session.targetAssessments.length;
            if (avgScore < 0.6) {
                recommendations.push('Overall session quality is below acceptable threshold');
            }
        }
        
        recommendations.push('Continue systematic constitutional assessment');
        recommendations.push('Focus on applying high-priority corrections');
        
        return recommendations;
    }    // ReAct Helper Methods
        private async planInitialActions(session: ReActSession, input: ReActInput): Promise<void> {
        // Generate initial action plan based on goal
        const initialActions: Action[] = [];
        const goalLower = input.goal.toLowerCase();

        // Simple keyword-based initial planning
        if (goalLower.includes('research') || goalLower.includes('find information') || goalLower.includes('search')) {
            initialActions.push({
                id: `action_${Date.now()}_search`,
                name: 'initial_knowledge_search',
                type: 'knowledge_query',
                parameters: { query: input.goal, context: 'initial_goal_research' },
                expectedOutcome: 'Gather initial relevant information about the goal.',
                confidence: 0.8,
                timestamp: Date.now()
            });
        } else if (goalLower.includes('create') || goalLower.includes('develop') || goalLower.includes('build')) {
            initialActions.push({
                id: `action_${Date.now()}_outline`,
                name: 'create_initial_outline',
                type: 'planning_step',
                parameters: { task: input.goal },
                expectedOutcome: 'A high-level outline or structure for the task.',
                confidence: 0.75,
                timestamp: Date.now()
            });
        } else {
            initialActions.push({
                id: `action_${Date.now()}_analyze`,
                name: 'analyze_goal_requirements',
                type: 'reasoning_step',
                parameters: { goal_to_analyze: input.goal },
                expectedOutcome: 'Clarified understanding of the goal and its sub-components.',
                confidence: 0.85,
                timestamp: Date.now()
            });
        }

        // Add a generic next step
        initialActions.push({
            id: `action_${Date.now()}_decide_next`,
            name: 'decide_next_specific_action',
            type: 'planning_step',
            parameters: {},
            expectedOutcome: 'Determine the most appropriate next concrete action.',
            confidence: 0.7,
            timestamp: Date.now()
        });
        
        session.actionPlan = {
            id: `plan_${session.id}_${Date.now()}`,
            goal: session.goal,
            actions: initialActions,
            currentActionIndex: 0,
            status: 'executing', // Plan is now being executed
            startTime: Date.now(),
            lastUpdated: Date.now()
        };
    }

    private async executeAction(action: Action, session: ReActSession, simulationMode: boolean): Promise<Observation> {
        let outcome = `Simulating execution of ${action.name} with params: ${JSON.stringify(action.parameters)}.`;
        let success = true;
        let learningPoints: string[] = [`Action '${action.name}' was simulated.`];
        let observationContent: any = { simulated: true, actionName: action.name, params: action.parameters };

        try {
            // Prioritize specific action names, then fall back to action types for broader categories
            if (action.name === 'knowledge_semantic_search' || action.type === 'knowledge_retrieval') {
                const searchResult = await this.handleSemanticSearch(action.parameters || { query: session.goal });
                observationContent = JSON.parse(searchResult.content[0].text);
                outcome = `Semantic search for "${action.parameters?.query || session.goal}" completed. Found ${observationContent.entities?.length || 0} entities.`;
                learningPoints.push(`Semantic search provided ${observationContent.entities?.length || 0} initial entities.`);
            } else if (action.name === 'memory_store' || action.type === 'memory_operation_store') {
                const storeResult = await this.handleMemoryStore(action.parameters || { content: "Default content from ReAct", context: "react_action" });
                observationContent = JSON.parse(storeResult.content[0].text);
                outcome = `Stored content in memory. Item ID: ${observationContent.itemId}.`;
                learningPoints.push(`Content successfully stored in working memory.`);
                success = observationContent.success;
            } else if (action.name === 'memory_retrieve' || action.type === 'memory_operation') {
                const retrieveResult = await this.handleMemoryRetrieve(action.parameters || { query: session.goal });
                observationContent = JSON.parse(retrieveResult.content[0].text);
                outcome = `Retrieved ${observationContent.memoryItems?.length || 0} memory items and ${observationContent.semanticEntities?.length || 0} semantic entities.`;
                learningPoints.push(`Memory retrieval operation completed.`);
            } else if (action.name === 'reason' || action.type === 'reasoning_step') {
                 const reasonInput: ReasoningInput = {
                    query: action.parameters?.query || `Reason about: ${session.goal} after ${action.name}`,
                    context: action.parameters?.context || { current_action: action.name, session_goal: session.goal },
                    useWorkingMemory: action.parameters?.useWorkingMemory !== undefined ? action.parameters.useWorkingMemory : true,
                    maxSteps: action.parameters?.maxSteps
                };
                const reasonResult = await this.handleReasoning(reasonInput);
                observationContent = JSON.parse(reasonResult.content[0].text);
                outcome = `Reasoning step '${action.name}' completed. Result: ${observationContent.result}`;
                learningPoints.push(`Reasoning provided new insights or conclusions.`);
            } else if (action.name === 'sequential_thinking' || (action.type as string) === 'cognitive_process_sequential') {
                const thinkingInput: SequentialThinkingInput = {
                    problem: action.parameters?.problem || `Think sequentially about: ${session.goal}`,
                    context: action.parameters?.context || { session_goal: session.goal },
                    maxThoughts: action.parameters?.maxThoughts || 7,
                    allowBranching: action.parameters?.allowBranching !== undefined ? action.parameters.allowBranching : true,
                    requireHypotheses: action.parameters?.requireHypotheses !== undefined ? action.parameters.requireHypotheses : false,
                };
                const thinkingResult = await this.handleSequentialThinking(thinkingInput);
                observationContent = JSON.parse(thinkingResult.content[0].text);
                outcome = `Sequential thinking process completed. Final answer: ${observationContent.finalAnswer}`;
                learningPoints.push(`Sequential thinking generated ${observationContent.thinking?.thoughts?.length || 0} thoughts.`);
            } else if (action.name === 'knowledge_create_entity' || (action.type as string) === 'knowledge_graph_modification') {
                const entityResult = await this.handleCreateEntity(action.parameters);
                observationContent = JSON.parse(entityResult.content[0].text);
                outcome = observationContent.success ? `Entity '${observationContent.entity?.name}' created.` : `Failed to create entity: ${observationContent.error}`;
                learningPoints.push(outcome);
                success = observationContent.success;
            } else if (action.name === 'constitutional_assess' || (action.type as string) === 'quality_assessment') {
                const assessInput: ConstitutionalInput = {
                    targetId: action.parameters?.targetId, // Could be the session.id or a specific cycle/thought id
                    targetType: action.parameters?.targetType || 'react_session', // Default to assessing the ReAct session
                    frameworkId: action.parameters?.frameworkId,
                    includeCorrections: action.parameters?.includeCorrections !== undefined ? action.parameters.includeCorrections : true,
                    autoApplyCorrections: action.parameters?.autoApplyCorrections !== undefined ? action.parameters.autoApplyCorrections : false,
                };
                const assessResult = await this.handleConstitutionalAssess(assessInput);
                observationContent = JSON.parse(assessResult.content[0].text);
                outcome = `Constitutional assessment completed. Overall score: ${observationContent.assessment?.overallScore?.toFixed(2)}.`;
                learningPoints.push(`Assessment provided ${observationContent.corrections?.length || 0} corrections.`);
            }
            // Placeholder for external tool integration
            else if (action.type === 'tool_call' && !simulationMode) {
                // This is where you would implement logic to call an external API or service
                // For example, using fetch or a dedicated SDK for the external tool
                outcome = `Attempting to call external tool: ${action.name} with params: ${JSON.stringify(action.parameters)}.`;
                learningPoints.push(`External tool call initiated for ${action.name}.`);
                // const externalResponse = await callExternalTool(action.name, action.parameters);
                // observationContent = externalResponse.data;
                // success = externalResponse.success;
                // outcome = `External tool ${action.name} executed. Success: ${success}.`;
                // For simulation, we'll just acknowledge it
                observationContent = { simulated_external_call: true, tool_name: action.name, params: action.parameters };
                outcome = `Simulated call to external tool: ${action.name}.`;
                learningPoints.push(`External tool call for ${action.name} was simulated.`);
                success = true; // In simulation, assume success unless specified otherwise
            }
            // Fallback for unhandled actions in simulation mode
            else if (simulationMode) {
                outcome = `Simulated action '${action.name}' of type '${action.type}' executed successfully.`;
                learningPoints.push(`Action '${action.name}' was simulated as no specific internal handler matched.`);
                observationContent = { simulated_generic: true, actionName: action.name, actionType: action.type, params: action.parameters };
                success = true;
            }
            // If not in simulation mode and action is not handled
            else {
                outcome = `Action '${action.name}' (type: '${action.type}') is not recognized or cannot be executed by internal handlers.`;
                success = false;
                learningPoints.push(`Unrecognized or unexecutable action: ${action.name}.`);
                observationContent = { error: outcome, actionName: action.name, actionType: action.type };
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            outcome = `Error executing action ${action.name}: ${errorMessage}`;
            success = false;
            learningPoints.push(`Failed to execute action '${action.name}' due to error: ${errorMessage}.`);
            observationContent = { error: outcome, stack: error instanceof Error ? error.stack : undefined };
            console.error(`ReAct Action Execution Error for "${action.name}":`, error);
        }
        
        const observation: Observation = {
            id: `obs_${session.id}_${Date.now()}`,
            actionId: action.id,
            outcome,
            success,
            timestamp: Date.now(),
            learningPoints,
            confidence: success ? 0.85 : 0.3, // Confidence in the observation itself
            content: observationContent 
        };

        // this.cognitiveState.observationHistory.push(observation); // Already pushed in handleReActExecuteAction
        return observation;
    }

    private async generateReflection(action: Action, observation: Observation, session: ReActSession): Promise<string> {
        let reflectionText = `Reflection on action '${action.name}':\n`;
        reflectionText += `  - Expected Outcome: ${action.expectedOutcome}\n`;
        reflectionText += `  - Actual Outcome: ${observation.outcome}\n`;
        reflectionText += `  - Success: ${observation.success}\n`;

        if (observation.success) {
            reflectionText += `  - Learning: ${observation.learningPoints.join('. ')}\n`;
            if (JSON.stringify(observation.content).length < 200) { // Keep it brief if content is large
                 reflectionText += `  - Observation Content Summary: ${JSON.stringify(observation.content)}\n`;
            } else {
                 reflectionText += `  - Observation Content: (Content too large to display fully in reflection summary)\n`;
            }
            reflectionText += `  - Progress towards goal '${session.goal}': This action appears to have moved us forward.`;
        } else {
            reflectionText += `  - Problem: The action did not achieve the expected outcome.\n`;
            reflectionText += `  - Learning: ${observation.learningPoints.join('. ')}\n`;
            reflectionText += `  - Progress towards goal '${session.goal}': This was a setback. We need to re-evaluate the approach.`;
        }
        return reflectionText;
    }

    private async planNextStep(session: ReActSession, observation: Observation): Promise<string> {
        const cycleCount = session.cycles.length;
        const plan = session.actionPlan;

        if (!observation.success) {
            plan.status = 'needs_revision';
            plan.lastUpdated = Date.now();
            return `The previous action failed. Revising plan. Consider alternative to '${session.cycles[session.cycles.length-1].action.name}' or analyze failure.`;
        }

        if (plan.currentActionIndex < plan.actions.length - 1) {
            plan.currentActionIndex++;
            const nextActionInPlan = plan.actions[plan.currentActionIndex];
            plan.lastUpdated = Date.now();
            return `Proceeding with planned action: '${nextActionInPlan.name}'.`;
        } else {
            // Plan exhausted, or goal might be achieved
            const goalAchieved = await this.assessGoalCompletion(session); // Assuming this method exists
            if (goalAchieved) {
                plan.status = 'completed';
                plan.endTime = Date.now();
                session.status = 'completed';
                session.endTime = Date.now();
                session.finalOutcome = `Goal '${session.goal}' achieved after ${cycleCount} cycles.`;
                return `Goal '${session.goal}' appears to be achieved. Concluding ReAct session.`;
            } else if (cycleCount >= (session.maxCycles || 10) ) { // Max cycles check
                plan.status = 'failed'; 
                plan.endTime = Date.now();
                session.status = 'failed_max_cycles'; 
                session.endTime = Date.now();
                session.finalOutcome = `Max cycles reached for goal '${session.goal}'.`;
                return `Maximum cycles reached. Concluding ReAct session for goal '${session.goal}'.`;
            } else {
                plan.status = 'needs_extension';
                plan.lastUpdated = Date.now();
                // Suggest a generic next step if plan is exhausted but goal not met
                const newAction: Action = {
                    id: `action_${Date.now()}_evaluate_progress`,
                    name: 'evaluate_overall_progress_and_plan_further',
                    type: 'planning_step',
                    parameters: { current_goal_status: `After ${cycleCount} cycles, progress on '${session.goal}' needs assessment.` },
                    expectedOutcome: 'A clear plan for the next phase of actions or determination if goal is unachievable with current strategy.',
                    confidence: 0.7,
                    timestamp: Date.now()
                };
                plan.actions.push(newAction);
                // currentActionIndex is already at the end, so pushing and then incrementing will point to the new action
                plan.currentActionIndex = plan.actions.length -1;

                return `Initial plan completed, but goal '${session.goal}' not yet fully achieved. Added 'evaluate_overall_progress_and_plan_further' to plan.`;
            }
        }
    }


    private async updateLearningsFromCycle(cycle: ReActCycle, session: ReActSession): Promise<void> {
            const learningSummary = `From action '${cycle.action.name}' (in cycle ${cycle.id}): Observation - ${cycle.observation.outcome.substring(0, 100)}... Success: ${cycle.observation.success}. Reflection: ${cycle.reflection.substring(0,100)}...`;
            session.learningsSummary.push(learningSummary);

            const logEntry: LearningLogEntry = {
                id: `learnLog-${cycle.id}-${Date.now()}`,
                timestamp: Date.now(),
                message: `ReAct cycle ${cycle.id} completed for session ${session.id}. Action: ${cycle.action.name}. Outcome success: ${cycle.observation.success}.`,
                sourceActionId: cycle.action.id,
                sourceActionName: cycle.action.name,
                sessionId: session.id,
                cycleId: cycle.id,
                tags: ['react_cycle', 'learning', cycle.observation.success ? 'success' : 'failure'],
                severity: 'info'
            };
            this.cognitiveState.learningsLog.push(logEntry); // Or learningsDatabase, if distinct
            // If learningsDatabase is meant to be a duplicate or a more processed version, ensure its population is correct.
            // For now, assuming learningsLog is the primary place for these detailed entries.
        }
 

    private async performSessionReflection(session: ReActSession, reflection: string, strategicAdjustments: string[]): Promise<any> {
        return {
            overallAssessment: reflection,
            adjustments: strategicAdjustments,
            sessionProgress: `Completed ${session.cycles.length} cycles`,
            nextRecommendations: ['Continue with planned approach', 'Monitor progress closely']
        };
    }

    private async applyStrategicAdjustments(session: ReActSession, adjustments: string[]): Promise<void> {
        // Apply adjustments to session strategy
        adjustments.forEach(adjustment => {
            console.log(`Applying adjustment to session ${session.id}: ${adjustment}`);
        });
    }

    private async assessGoalCompletion(session: ReActSession): Promise<boolean> {
        // Simple heuristic: consider goal achieved after 3+ successful cycles
        return session.cycles.length >=  3 && 
               session.cycles.every(cycle => cycle.observation.success);
    }

    // Server run method
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.log('Brainiac MCP Server running on stdio');
    }


    // Learning and Adaptation Engine Handlers
    
private async handleLearningFeedback(args: any): Promise<any> {
    const { sessionId, sessionType, feedbackType, rating, corrections, preferences, suggestions, context } = args;
    
    const feedback: UserFeedback = {
        id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sessionId,
        sessionType,
        feedbackType,
        rating,
        corrections: corrections || [],
        preferences: preferences || [],
        suggestions: suggestions || [],
        context: context || {},
        timestamp: Date.now()
    };
    
    this.cognitiveState.userFeedbackHistory.push(feedback);
    
    // Process feedback to update patterns
    await this.processFeedbackForPatterns(feedback);
    
    // Update performance metrics
    await this.updatePerformanceFromFeedback(feedback);
    
    return {
        content: [{
            type: "text",
            text: `Feedback processed successfully. Updated patterns and performance metrics based on ${feedbackType} feedback for session ${sessionId}.`
        }]
    };
}

private async handleLearningAdapt(args: any): Promise<any> {
    const { priority, domains, forceAdaptation } = args;
    
    const applicableRules = this.cognitiveState.adaptationRules.filter(rule => {
        if (priority && rule.metadata.priority !== priority) return false;
        if (domains && !domains.some((d: string) => rule.adaptation.modifications.domains?.includes(d))) return false;
        return true;
    });
    
    const adaptationsApplied: string[] = [];
    
    for (const rule of applicableRules) {
        if (forceAdaptation || this.shouldApplyAdaptation(rule)) {
            await this.applyAdaptationRule(rule);
            adaptationsApplied.push(rule.name);
            rule.application.appliedCount++;
            rule.application.lastApplied = Date.now();
        }
    }
    
    return {
        content: [{
            type: "text",
            text: `Applied ${adaptationsApplied.length} adaptation rules: ${adaptationsApplied.join(', ')}. Learning engine updated with new behavioral patterns.`
        }]
    };
}

private async handleLearningDemonstrate(args: any): Promise<any> {
    const { title, description, input, context, expectedApproach, idealProcess, expectedOutput, qualityRating, annotations } = args;
    
    const example: LearningExample = {
        id: `example_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title,
        description,
        example: {
            input,
            context: context || {},
            expectedApproach,
            idealProcess: idealProcess || [],
            expectedOutput
        },
        demonstration: {
            actualProcess: idealProcess || [],
            actualOutput: expectedOutput,
            qualityRating: qualityRating || 1.0,
            annotations: annotations || []
        },
        learningPoints: {
            techniques: this.extractTechniques(idealProcess),
            principles: this.extractPrinciples(expectedApproach),
            patterns: this.extractPatterns(idealProcess),
            antiPatterns: []
        },
        applicability: {
            problemTypes: this.inferProblemTypes(input),
            domains: this.inferDomains(context),
            complexityRange: {
            min: 1,
            max: 10
        },
        userTypes: [], // Add this missing property
        similarityThreshold: 0.8
        },
        impact: {
            timesReferenced: 0,
            influencedPatterns: [],
            improvementMeasured: 0,
            lastUsed: Date.now()
        },
        metadata: {
            source: 'user_demonstration',
            created: Date.now(),
            verified: false
        }
    };
    
    this.cognitiveState.exampleDatabase.push(example);
    
    // Extract and update patterns from this example
    await this.learnFromExample(example);
    
    this.cognitiveState.learningEngine.stats.examplesLearned++;
    this.cognitiveState.learningEngine.lastActivity.exampleIntegration = Date.now();
    
    return {
        content: [{
            type: "text",
            text: `Learning example "${title}" processed successfully. Extracted ${example.learningPoints.techniques.length} techniques, ${example.learningPoints.principles.length} principles, and ${example.learningPoints.patterns.length} patterns.`
        }]
    };
}

private async handleLearningPatterns(args: any): Promise<any> {
    const { filterByDomain, minConfidence, includePerformance } = args;
    
    let patterns = this.cognitiveState.recognizedPatterns;
    
    if (filterByDomain) {
        patterns = patterns.filter(p => p.applicableContexts.domains.includes(filterByDomain));
    }
    
    if (minConfidence) {
        patterns = patterns.filter(p => p.learnedFrom.confidence >= minConfidence);
    }
    
    const patternSummary = patterns.map(pattern => ({
        id: pattern.id,
        name: pattern.name,
        description: pattern.description,
        successRate: pattern.performance.successRate,
        usageCount: pattern.performance.usageCount,
        confidence: pattern.learnedFrom.confidence,
        lastUsed: new Date(pattern.performance.lastUsed).toISOString(),
        applicableDomains: pattern.applicableContexts.domains,
        performance: includePerformance ? pattern.performance : undefined
    }));
    
    const adaptationRules = this.cognitiveState.adaptationRules.map(rule => ({
        id: rule.id,
        name: rule.name,
        priority: rule.metadata.priority,
        appliedCount: rule.application.appliedCount,
        successRate: rule.application.successRate
    }));
    
    return {
        content: [{
            type: "text",
            text: `Found ${patterns.length} recognized patterns and ${adaptationRules.length} adaptation rules.\n\nPatterns:\n${JSON.stringify(patternSummary, null, 2)}\n\nAdaptation Rules:\n${JSON.stringify(adaptationRules, null, 2)}`
        }]
    };
}

private async handleLearningMetrics(args: any): Promise<any> {
    const { timeframe, includeBreakdown } = args;
    
    const now = Date.now();
    const timeframeMs = this.parseTimeframe(timeframe);
    const startTime = now - timeframeMs;
    
    // Filter performance history by timeframe
    const relevantMetrics = this.cognitiveState.performanceHistory.filter(
        (        p: { timeframe: { start: number; end: number; }; }) => p.timeframe.start >= startTime
    );
    
    if (relevantMetrics.length === 0) {
        return {
            content: [{
                type: "text",
                text: "No performance data available for the specified timeframe."
            }]
        };
    }
    
    // Aggregate metrics
    const avgQuality = relevantMetrics.reduce((sum: any, m: { metrics: { averageQuality: any; }; }) => sum + m.metrics.averageQuality, 0) / relevantMetrics.length;
    const avgSatisfaction = relevantMetrics.reduce((sum: any, m: { metrics: { userSatisfaction: any; }; }) => sum + m.metrics.userSatisfaction, 0) / relevantMetrics.length;
    const totalSessions = relevantMetrics.reduce((sum: any, m: { metrics: { sessionCount: any; }; }) => sum + m.metrics.sessionCount, 0);
    
    const metrics = {
        timeframe: {
            start: new Date(startTime).toISOString(),
            end: new Date(now).toISOString(),
            duration: timeframe
        },
        performance: {
            averageQuality: Number(avgQuality.toFixed(3)),
            averageSatisfaction: Number(avgSatisfaction.toFixed(3)),
            totalSessions,
            improvementRate: this.calculateImprovementRate(relevantMetrics)
        },
        learning: {
            totalFeedbackProcessed: this.cognitiveState.learningEngine.stats.totalFeedbackProcessed,
            patternsRecognized: this.cognitiveState.learningEngine.stats.patternsRecognized,
            adaptationsApplied: this.cognitiveState.learningEngine.stats.adaptationsApplied,
            examplesLearned: this.cognitiveState.learningEngine.stats.examplesLearned
        },
        insights: this.generatePerformanceInsights(relevantMetrics),
        breakdown: includeBreakdown ? this.generateMetricsBreakdown(relevantMetrics) : undefined
    };
    
    return {
        content: [{
            type: "text",
            text: `Learning and Performance Metrics:\n${JSON.stringify(metrics, null, 2)}`
        }]
    };
}

// Helper methods for learning functionality
    private async processFeedbackForPatterns(feedback: UserFeedback): Promise<void> {
        // Analyze feedback to identify or update patterns
        if (feedback.corrections && feedback.corrections.length > 0) {
            for (const correction of feedback.corrections) {
                await this.updatePatternsFromCorrection(correction, feedback);
            }
        }

        if (feedback.preferences && feedback.preferences.length > 0) {
            await this.updatePatternsFromPreferences(feedback.preferences, feedback);
        }

        this.cognitiveState.learningEngine.stats.totalFeedbackProcessed++;
        this.cognitiveState.learningEngine.lastActivity.feedbackProcessing = Date.now();
    }



private shouldApplyAdaptation(rule: AdaptationRule): boolean {
    const { threshold, frequency } = rule.trigger;
    const evidenceConfidence = rule.evidence.confidence; // Confidence in the evidence supporting the rule
    const timeSinceLastApplied = Date.now() - (rule.application.lastApplied || 0);
    
    // Condition 1: Evidence confidence must meet the rule's threshold
    const meetsConfidenceThreshold = evidenceConfidence >= threshold;
    
    // Condition 2: Enough time must have passed since last application (frequency check)
    // Frequency could be in milliseconds. e.g., 3600000 for 1 hour.
    const meetsFrequencyRequirement = timeSinceLastApplied >= frequency;

    // Condition 3: (Optional) Rule priority might influence application
    // For example, critical rules might be applied more readily.
    // const meetsPriorityRequirement = rule.metadata.priority === 'critical' || (meetsConfidenceThreshold && meetsFrequencyRequirement);

    // Condition 4: (Optional) Check if the rule is currently "active" or "enabled"
    // const isRuleActive = rule.status !== 'inactive'; // Assuming a status field

    // For now, focusing on confidence and frequency
    if (meetsConfidenceThreshold && meetsFrequencyRequirement) {
        console.log(`Adaptation rule "${rule.name}" met conditions: EvidenceConfidence (${evidenceConfidence.toFixed(2)}) >= Threshold (${threshold.toFixed(2)}) AND TimeSinceLast (${timeSinceLastApplied}ms) >= Frequency (${frequency}ms).`);
        return true;
    }
    return false;
}

private async applyAdaptationRule(rule: AdaptationRule): Promise<void> {
    // Apply the adaptation based on the rule type
    switch (rule.adaptation.adjustmentType) {
        case 'strategy_modification':
            await this.modifyStrategy(rule.adaptation.modifications);
            break;
        case 'parameter_tuning':
            await this.tuneParameters(rule.adaptation.modifications);
            break;
        case 'approach_selection':
            await this.updateApproachSelection(rule.adaptation.modifications);
            break;
        case 'technique_emphasis':
            await this.emphasizeTechniques(rule.adaptation.modifications);
            break;
    }
}

private extractTechniques(process: string[]): string[] {
    const techniques = new Set<string>();
    const techniqueMatchers: Record<string, RegExp> = {
        'analysis': /\b(analyze|analysis|examine|investigate|break down)\b/i,
        'synthesis': /\b(synthesize|synthesis|combine|integrate|construct)\b/i,
        'evaluation': /\b(evaluate|evaluation|assess|judge|critique)\b/i,
        'decomposition': /\b(decompose|decomposition|dissect)\b/i,
        'comparison': /\b(compare|comparison|contrast|differentiate)\b/i,
        'abstraction': /\b(abstract|generalize)\b/i,
        'deduction': /\b(deduce|deductive|infer)\b/i,
        'induction': /\b(induce|inductive|generalize from examples)\b/i,
        'problem_solving': /\b(solve|address problem|find solution)\b/i,
    };

    for (const step of process) {
        for (const techKey in techniqueMatchers) {
            if (techniqueMatchers[techKey].test(step)) {
                techniques.add(techKey);
            }
        }
    }
    return Array.from(techniques);
}

private extractPrinciples(approach: string): string[] {
    const principles = new Set<string>();
    const lowerApproach = approach.toLowerCase();
    const principleMatchers: Record<string, RegExp> = {
        'systematic_approach': /\b(systematic|methodical|structured)\b/i,
        'evidence_based': /\b(evidence|fact-based|data-driven|empirical)\b/i,
        'logical_reasoning': /\b(logical|rational|coherent|sound reasoning)\b/i,
        'comprehensive_analysis': /\b(comprehensive|thorough|holistic|in-depth)\b/i,
        'objectivity': /\b(objective|unbiased|impartial)\b/i,
        'clarity': /\b(clear|explicit|unambiguous)\b/i,
        'parsimony': /\b(parsimony|occam's razor|simple explanation)\b/i, // Added
        'falsifiability': /\b(falsifiable|testable)\b/i, // Added
    };

    for (const principleKey in principleMatchers) {
        if (principleMatchers[principleKey].test(lowerApproach)) {
            principles.add(principleKey);
        }
    }
    return Array.from(principles);
}

private extractPatterns(process: string[]): string[] {
    const patterns = new Set<string>();
    const patternMatchers: Record<string, RegExp> = {
        'hypothesis_testing': /\b(hypothesis|hypothesize|test assumption)\b/i,
        'alternative_consideration': /\b(alternative|option|another perspective|different approach|consider options)\b/i,
        'iterative_refinement': /\b(iterate|refine|iterative|incremental improvement|step-wise refinement)\b/i,
        'root_cause_analysis': /\b(root cause|underlying reason|diagnose)\b/i,
        'means_ends_analysis': /\b(means-ends|gap analysis|bridge the gap)\b/i, // Added
        'analogical_reasoning': /\b(analogy|analogous|similar to)\b/i, // Added
    };

    if (process.length > 3) { // Heuristic for multi-step
        patterns.add('multi_step_reasoning');
    }
    if (process.some(step => step.toLowerCase().includes("if") && step.toLowerCase().includes("then"))) { // Heuristic for conditional
        patterns.add('conditional_reasoning');
    }


    for (const step of process) {
        const lowerStep = step.toLowerCase();
        for (const patternKey in patternMatchers) {
            if (patternMatchers[patternKey].test(lowerStep)) {
                patterns.add(patternKey);
            }
        }
    }
    return Array.from(patterns);
}

private inferProblemTypes(input: any): string[] {
    const types = new Set<string>();
    const inputStr = JSON.stringify(input).toLowerCase();
    const problemTypeMatchers: Record<string, RegExp> = {
        'analytical': /\b(analyze|analysis|examine|investigate|diagnose|interpret)\b/i,
        'problem_solving': /\b(solve|resolve|fix|address problem|troubleshoot)\b/i,
        'explanatory': /\b(explain|clarify|describe why|justify|elaborate)\b/i,
        'comparative': /\b(compare|contrast|differentiate|evaluate options|rank)\b/i,
        'design': /\b(design|create|develop|architect|build|plan)\b/i,
        'predictive': /\b(predict|forecast|estimate future|project)\b/i,
        'decision_making': /\b(decide|choose|select|determine best course)\b/i,
        'generative': /\b(generate|compose|write|summarize|draft)\b/i,
        'evaluative': /\b(evaluate|assess|review|critique quality)\b/i, // Distinct from evaluation technique
        'classification': /\b(classify|categorize|group|type)\b/i,
    };

    for (const domainKey in problemTypeMatchers) {
        if (problemTypeMatchers[domainKey].test(inputStr)) {
            types.add(domainKey);
        }
    }
    if (types.size === 0 && inputStr.length > 0) types.add('general_query'); // Default if no specific type found
    return Array.from(types);
}

private inferDomains(context: Record<string, any>): string[] {
    const domains = new Set<string>();
    const contextStr = JSON.stringify(context).toLowerCase();
    const domainMatchers: Record<string, RegExp> = {
        'technical': /\b(technical|engineering|software|hardware|algorithm|data structure|it|information technology)\b/i,
        'business': /\b(business|finance|market|strategy|economic|commerce|sales|operations)\b/i,
        'scientific': /\b(scientific|research|experiment|biology|physics|chemistry|academic|study)\b/i,
        'creative': /\b(creative|art|design|music|writing|narrative|aesthetic)\b/i,
        'educational': /\b(educational|learning|teaching|pedagogy|curriculum)\b/i,
        'medical': /\b(medical|health|clinical|patient|pharma|disease|healthcare)\b/i,
        'legal': /\b(legal|law|compliance|regulatory|judicial|litigation)\b/i,
        'social_sciences': /\b(social|psychology|sociology|anthropology|political science|humanities)\b/i,
        'environmental': /\b(environment|ecology|sustainability|climate)\b/i,
        'personal_development': /\b(personal|self-help|productivity|well-being)\b/i,
    };

    for (const domainKey in domainMatchers) {
        if (domainMatchers[domainKey].test(contextStr)) {
            domains.add(domainKey);
        }
    }
    if (domains.size === 0 && contextStr.length > 0) domains.add('general'); // Default if no specific domain found
    return Array.from(domains);
}

private async learnFromExample(example: LearningExample): Promise<void> {
    const SIMILARITY_THRESHOLD = 0.65; // Threshold for considering a pattern "similar enough" to refine
    let existingPatternToRefine: ReasoningPattern | undefined = undefined;
    let highestSimilarity = 0;

    // 1. Try to find an existing pattern to refine
    for (const p of this.cognitiveState.recognizedPatterns) {
        const similarity = this.calculatePatternSimilarity(p, example);
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            if (similarity >= SIMILARITY_THRESHOLD) {
                existingPatternToRefine = p;
                // Optimization: if a very high match is found, could break early,
                // or continue to find the absolute best match.
                // For now, we find the one with highest similarity above threshold.
            }
        }
    }
     // Ensure we only refine if a pattern was actually found above threshold
    if (existingPatternToRefine && highestSimilarity < SIMILARITY_THRESHOLD) {
        existingPatternToRefine = undefined;
    }


    if (existingPatternToRefine) {
        // 2. Refine existing pattern
        console.log(`LEARNING: Refining existing pattern "${existingPatternToRefine.name}" with example "${example.title}". Similarity: ${highestSimilarity.toFixed(2)}`);
        this.refineExistingPatternWithExample(existingPatternToRefine, example);
        example.impact.influencedPatterns.push(existingPatternToRefine.id);
        // Do not increment patternsRecognized here, as we are refining an existing one.
    } else {
        // 3. Create a new pattern
        console.log(`LEARNING: No sufficiently similar pattern found (max similarity: ${highestSimilarity.toFixed(2)}). Creating new pattern from example "${example.title}".`);
        const newPattern = this.createNewPatternFromExample(example);
        this.cognitiveState.recognizedPatterns.push(newPattern);
        this.cognitiveState.learningEngine.stats.patternsRecognized++; // Increment only for new patterns
        example.impact.influencedPatterns.push(newPattern.id);
    }

    example.impact.timesReferenced = (example.impact.timesReferenced || 0) + 1;
    example.impact.lastUsed = Date.now();
    this.cognitiveState.learningEngine.lastActivity.patternAnalysis = Date.now();
}

// Helper for similarity calculation
private calculatePatternSimilarity(pattern: ReasoningPattern, example: LearningExample): number {
    let score = 0;
    const MAX_SCORE_COMPONENTS = 4; // Number of components being compared

    // Component 1: Techniques overlap (Jaccard Index)
    const exampleTechniques = new Set(example.learningPoints.techniques || []);
    const patternTechniques = new Set(pattern.pattern.techniques || []);
    const intersectionTechniques = new Set([...exampleTechniques].filter(t => patternTechniques.has(t)));
    const unionTechniques = new Set([...exampleTechniques, ...patternTechniques]);
    if (unionTechniques.size > 0) {
        score += intersectionTechniques.size / unionTechniques.size;
    } else if (exampleTechniques.size === 0 && patternTechniques.size === 0) {
        score += 0.5; // Both have no specific techniques, consider partially similar in this aspect
    }

    // Component 2: Problem Types overlap
    const exampleProblemTypes = new Set(example.applicability.problemTypes || []);
    const patternProblemTypes = new Set(pattern.applicableContexts.problemTypes || []);
    const intersectionProblemTypes = new Set([...exampleProblemTypes].filter(pt => patternProblemTypes.has(pt)));
    const unionProblemTypes = new Set([...exampleProblemTypes, ...patternProblemTypes]);
    if (unionProblemTypes.size > 0) {
        score += intersectionProblemTypes.size / unionProblemTypes.size;
    } else if (exampleProblemTypes.size === 0 && patternProblemTypes.size === 0) {
        score += 0.5; // Both general, perfectly similar in this aspect
    }


    // Component 3: Domains overlap
    const exampleDomains = new Set(example.applicability.domains || []);
    const patternDomains = new Set(pattern.applicableContexts.domains || []);
    const intersectionDomains = new Set([...exampleDomains].filter(d => patternDomains.has(d)));
    const unionDomains = new Set([...exampleDomains, ...patternDomains]);
    if (unionDomains.size > 0) {
        score += intersectionDomains.size / unionDomains.size;
    } else if (exampleDomains.size === 0 && patternDomains.size === 0) {
        score += 0.5; // Both general, perfectly similar in this aspect
    }

    // Component 4: Approach string similarity (simple substring match)
    const exampleApproachLower = (example.example.expectedApproach || "").toLowerCase();
    const patternApproachLower = (pattern.pattern.approach || "").toLowerCase();
    if (exampleApproachLower.length > 0 && patternApproachLower.length > 0) {
        if (exampleApproachLower.includes(patternApproachLower) || patternApproachLower.includes(exampleApproachLower)) {
            score += 0.5;
            if (exampleApproachLower === patternApproachLower) {
                score += 0.5; // Full point for exact match
            }
        }
    } else if (exampleApproachLower.length === 0 && patternApproachLower.length === 0) {
        score += 0.5; // Both have no specific approach, similar in this aspect
    }

    return score / MAX_SCORE_COMPONENTS; // Normalize
}

// Helper for refining an existing pattern
private refineExistingPatternWithExample(pattern: ReasoningPattern, example: LearningExample): void {
    const exampleQuality = example.demonstration.qualityRating;
    const oldUsageCount = pattern.performance.usageCount || 0;

    // Refine approach: (Cautious update)
    // If example is higher quality and approach is substantially different, log for now.
    // A more sophisticated system might version patterns or use a blend.
    if (exampleQuality > (pattern.performance.averageQuality || 0) &&
        example.example.expectedApproach &&
        example.example.expectedApproach !== pattern.pattern.approach) {
        console.log(`LEARNING: Example approach "${example.example.expectedApproach}" (quality ${exampleQuality}) differs from pattern approach "${pattern.pattern.approach}" (quality ${pattern.performance.averageQuality}). Consider manual review for approach update.`);
        // Potentially, if confidence is very high: pattern.pattern.approach = example.example.expectedApproach;
    }

    // Refine techniques: merge and unique
    pattern.pattern.techniques = Array.from(new Set([...(pattern.pattern.techniques || []), ...(example.learningPoints.techniques || [])]));

    // Refine sequence: (Complex - placeholder for future logic)
    // For now, if example sequence is significantly different and of high quality, it might indicate a need for review or a new pattern variant.
    // We won't directly merge sequences without more advanced algorithms.

    // Update performance metrics
    pattern.performance.averageQuality =
        ((pattern.performance.averageQuality || 0) * oldUsageCount + exampleQuality) / (oldUsageCount + 1);
    pattern.performance.successRate =
        ((pattern.performance.successRate || 0) * oldUsageCount + exampleQuality) / (oldUsageCount + 1);
    pattern.performance.usageCount = oldUsageCount + 1;
    pattern.performance.lastUsed = Date.now();

    // Update applicable contexts (expand)
    pattern.applicableContexts.problemTypes = Array.from(new Set([...(pattern.applicableContexts.problemTypes || []), ...(example.applicability.problemTypes || [])]));
    pattern.applicableContexts.domains = Array.from(new Set([...(pattern.applicableContexts.domains || []), ...(example.applicability.domains || [])]));
    pattern.applicableContexts.complexityRange.min = Math.min(pattern.applicableContexts.complexityRange.min, example.applicability.complexityRange.min);
    pattern.applicableContexts.complexityRange.max = Math.max(pattern.applicableContexts.complexityRange.max, example.applicability.complexityRange.max);

    // Update learnedFrom
    if (!pattern.learnedFrom.exampleIds.includes(example.id)) {
        pattern.learnedFrom.exampleIds.push(example.id);
    }
    pattern.learnedFrom.confidence = Math.max(pattern.learnedFrom.confidence, exampleQuality); // Or weighted average

    pattern.metadata.lastUpdated = Date.now();
    pattern.metadata.version = (parseFloat(pattern.metadata.version || "1.0") + 0.1).toFixed(1);

    console.log(`LEARNING: Pattern "${pattern.name}" refined. New avgQuality: ${pattern.performance.averageQuality.toFixed(2)}, new confidence: ${pattern.learnedFrom.confidence.toFixed(2)}.`);
}

// Helper for creating a new pattern (can include generalization logic here)
private createNewPatternFromExample(example: LearningExample): ReasoningPattern {
    const newPattern: ReasoningPattern = {
        id: `pattern_ex_${example.id.substring(0, 8)}_${Date.now()}`,
        name: `Pattern: ${example.title}`, // Future: Generalize name if content is generalized
        description: `Learned from demonstration: ${example.description}`,
        pattern: {
            conditions: this.generalizeConditions(example.applicability),
            approach: example.example.expectedApproach, // Future: Generalize approach
            techniques: example.learningPoints.techniques || [],
            sequence: example.example.idealProcess || [] // Future: Generalize sequence
        },
        performance: {
            successRate: example.demonstration.qualityRating,
            averageQuality: example.demonstration.qualityRating,
            usageCount: 1, // Starts with 1 usage (from this example)
            lastUsed: Date.now()
        },
        applicableContexts: { // Deep copy applicability to avoid shared references if example.applicability is complex
            problemTypes: [...(example.applicability.problemTypes || [])],
            domains: [...(example.applicability.domains || [])],
            complexityRange: { ...example.applicability.complexityRange },
            userTypes: [...(example.applicability.userTypes || [])],
            similarityThreshold: example.applicability.similarityThreshold
        },
        learnedFrom: {
            feedbackIds: [],
            exampleIds: [example.id],
            discoveryMethod: 'demonstration_new',
            confidence: example.demonstration.qualityRating
        },
        metadata: {
            created: Date.now(),
            lastUpdated: Date.now(),
            version: '1.0'
        }
    };
    console.log(`LEARNING: Created new pattern "${newPattern.name}" from example.`);
    return newPattern;
}

// Placeholder for condition generalization
private generalizeConditions(applicability: LearningExample['applicability']): string[] {
    // This is a placeholder. True generalization would involve semantic understanding,
    // hierarchy of problem types/domains, etc.
    const conditions: string[] = [];
    if (applicability.problemTypes && applicability.problemTypes.length > 0) {
        conditions.push(`ProblemType IN (${applicability.problemTypes.join(', ')})`);
    }
    if (applicability.domains && applicability.domains.length > 0) {
        conditions.push(`Domain IN (${applicability.domains.join(', ')})`);
    }
    // Add complexity range to conditions if meaningful
    // conditions.push(`Complexity BETWEEN ${applicability.complexityRange.min} AND ${applicability.complexityRange.max}`);

    if (conditions.length === 0) {
        conditions.push("General_Applicability");
    }
    return conditions;
}

private parseTimeframe(timeframe: string): number {
    const timeMap: Record<string, number> = {
        'hour': 60 * 60 * 1000,
        'day': 24 * 60 * 60 * 1000,
        'week': 7 * 24 * 60 * 60 * 1000,
        'month': 30 * 24 * 60 * 60 * 1000
    };
    return timeMap[timeframe] || timeMap['day'];
}

private calculateImprovementRate(metrics: PerformanceTracker[]): number {
    if (metrics.length < 2) return 0;
    
    const sortedMetrics = metrics.sort((a, b) => a.timeframe.start - b.timeframe.start);
    const first = sortedMetrics[0];
    const last = sortedMetrics[sortedMetrics.length - 1];
    
    const qualityImprovement = last.metrics.averageQuality - first.metrics.averageQuality;
    const timeSpan = last.timeframe.end - first.timeframe.start;
    
    return qualityImprovement / (timeSpan / (24 * 60 * 60 * 1000)); // per day
}

private generatePerformanceInsights(metrics: PerformanceTracker[]): string[] {
    const insights: string[] = [];
    
    if (metrics.length === 0) return insights;
    
    const avgQuality = metrics.reduce((sum, m) => sum + m.metrics.averageQuality, 0) / metrics.length;
    const avgSatisfaction = metrics.reduce((sum, m) => sum + m.metrics.userSatisfaction, 0) / metrics.length;
    
    if (avgQuality > 0.8) {
        insights.push("High quality reasoning performance maintained");
    } else if (avgQuality < 0.6) {
        insights.push("Reasoning quality needs improvement");
    }
    
    if (avgSatisfaction > 0.8) {
        insights.push("User satisfaction is high");
    } else if (avgSatisfaction < 0.6) {
        insights.push("User satisfaction could be improved");
    }
    
    const improvementRate = this.calculateImprovementRate(metrics);
    if (improvementRate > 0.01) {
        insights.push("Performance is improving over time");
    } else if (improvementRate < -0.01) {
        insights.push("Performance may be declining");
    }
    
    return insights;
}

private generateMetricsBreakdown(metrics: PerformanceTracker[]): any {
    return {
        qualityOverTime: metrics.map(m => ({
            time: new Date(m.timeframe.start).toISOString(),
            quality: m.metrics.averageQuality
        })),
        satisfactionOverTime: metrics.map(m => ({
            time: new Date(m.timeframe.start).toISOString(),
            satisfaction: m.metrics.userSatisfaction
        })),
        sessionCountOverTime: metrics.map(m => ({
            time: new Date(m.timeframe.start).toISOString(),
            sessions: m.metrics.sessionCount
        }))
    };
}

private getCurrentPerformanceTracker(): PerformanceTracker {
    const now = Date.now();
    let current = this.cognitiveState.performanceHistory.find(
        (        p: { timeframe: { start: number; end: number; }; }) => p.timeframe.start <= now && p.timeframe.end >= now
    );
    
    if (!current) {
        current = {
            id: `perf_${Date.now()}`,
            timeframe: {
                start: now,
                end: now + 24 * 60 * 60 * 1000, // 1 day
                period: 'day'
            },
            metrics: {
                sessionCount: 0,
                averageQuality: 0,
                userSatisfaction: 0,
                adaptationSuccess: 0,
                patternUtilization: 0,
                improvementRate: 0
            },
            breakdown: {
                byProblemType: {},
                byDomain: {},
                byComplexity: {},
                bySessionType: {}
            },
            trends: {
                qualityTrend: 'stable',
                satisfactionTrend: 'stable',
                adaptationTrend: 'stable',
                changeRate: 0
            },
            insights: {
                strengths: [],
                weaknesses: [],
                opportunities: [],
                recommendations: []
            }
        };
        this.cognitiveState.performanceHistory.push(current);
    }
    
    return current;
}

private async updatePatternsFromCorrection(correction: { original: string; corrected: string; reason: string; confidence: number }, feedback: UserFeedback): Promise<void> {
    console.log(`LEARNING: Updating patterns based on correction for session ${feedback.sessionId}. Original: "${correction.original}", Corrected: "${correction.corrected}"`);
    let patternModifiedOrRuleCreated = false;
    const originalTextLower = correction.original.toLowerCase();

    for (const pattern of this.cognitiveState.recognizedPatterns) {
        let matchScore = 0;
        // More sophisticated matching
        if (pattern.pattern.approach.toLowerCase().includes(originalTextLower)) {
            matchScore += 0.5;
        }
        if (pattern.description.toLowerCase().includes(originalTextLower)) {
            matchScore += 0.3;
        }
        if (pattern.pattern.sequence.some(step => step.toLowerCase().includes(originalTextLower))) {
            matchScore += 0.4;
        }

        if (matchScore > 0.5) { // Threshold for considering it a relevant pattern
            console.log(`LEARNING: Pattern "${pattern.name}" (match score: ${matchScore.toFixed(2)}) is relevant to the correction.`);
            patternModifiedOrRuleCreated = true;

            // Adjust pattern performance and confidence based on correction confidence and match score
            const adjustmentFactor = correction.confidence * (matchScore / 1.2); // Max matchScore is 0.5+0.3+0.4 = 1.2
            pattern.performance.successRate = Math.max(0, pattern.performance.successRate - 0.15 * adjustmentFactor);
            pattern.performance.averageQuality = Math.max(0, pattern.performance.averageQuality - 0.15 * adjustmentFactor);
            pattern.learnedFrom.confidence = Math.max(0.1, pattern.learnedFrom.confidence - 0.1 * adjustmentFactor); // Don't let confidence drop to 0 easily
            
            if (!pattern.learnedFrom.feedbackIds.includes(feedback.id)) {
                pattern.learnedFrom.feedbackIds.push(feedback.id);
            }
            pattern.metadata.lastUpdated = Date.now();
            
            // If pattern quality drops too low, consider marking it for review or deprecation
            if (pattern.performance.averageQuality < 0.3 && pattern.learnedFrom.confidence < 0.4) {
                console.warn(`LEARNING: Pattern "${pattern.name}" has very low quality/confidence after correction. Consider review or deprecation.`);
                // pattern.status = 'deprecated'; // Example: if a status field exists
            } else {
                console.log(`LEARNING: Adjusted metrics for pattern "${pattern.name}". New avgQuality: ${pattern.performance.averageQuality.toFixed(2)}, new confidence: ${pattern.learnedFrom.confidence.toFixed(2)}.`);
            }

            // Create a more specific adaptation rule
            const adaptationRule: AdaptationRule = {
                id: `adapt_corr_${pattern.id.substring(0,8)}_${Date.now()}`,
                name: `Adaptation from correction for pattern: ${pattern.name}`,
                description: `Based on feedback (ID: ${feedback.id}), when pattern similar to "${pattern.name}" is considered, prefer approaches aligned with "${correction.corrected}" over "${correction.original}". Reason: ${correction.reason}`,
                trigger: {
                    conditions: [
                        `pattern_context_similar_to: ${pattern.id}`, // Trigger when a similar pattern/context arises
                        `original_text_detected: ${correction.original.substring(0, Math.min(50, correction.original.length))}` // Check for presence of original problematic text
                    ],
                    threshold: 0.6 * correction.confidence, // Trigger if confidence in detection is high enough
                    frequency: 0 // Check always when conditions met
                },
                adaptation: {
                    adjustmentType: 'strategy_modification', // Could also be 'parameter_tuning' or 'technique_emphasis'
                    modifications: {
                        // More specific modifications:
                        // This is conceptual. Actual implementation would need to interpret these.
                        targetPatternId: pattern.id,
                        suggestedCorrection: correction.corrected,
                        originalContent: correction.original,
                        reasonForChange: correction.reason,
                        // Example: if pattern has steps, and original is a step
                        // modifyStep: { find: correction.original, replaceWith: correction.corrected }
                    },
                    expectedImprovement: 0.1 + (0.15 * correction.confidence) // Expected improvement if rule is applied
                },
                evidence: {
                    supportingFeedback: [feedback.id],
                    supportingPatterns: [pattern.id], // The pattern that triggered this rule
                    performanceData: [{ // Hypothetical data point
                        metric: 'correction_relevance',
                        value: matchScore,
                        timestamp: Date.now()
                    }],
                    confidence: correction.confidence
                },
                application: { appliedCount: 0, successRate: 0, lastApplied: 0, effectMeasured: false },
                metadata: { created: Date.now(), lastUpdated: Date.now(), priority: correction.confidence > 0.7 ? 'high' : 'medium' }
            };
            this.cognitiveState.adaptationRules.push(adaptationRule);
            this.cognitiveState.learningEngine.stats.adaptationsApplied++;
            console.log(`LEARNING: Created new adaptation rule "${adaptationRule.name}" for pattern "${pattern.name}".`);
        }
    }

    if (!patternModifiedOrRuleCreated && correction.confidence > 0.6) {
        console.log(`LEARNING: No existing patterns strongly matched the correction. Considering creating a new pattern for "${correction.corrected}".`);
        // Attempt to create a new pattern if the correction is confident and distinct.
        // This is a simplified creation process.
        const newPattern: ReasoningPattern = {
            id: `pattern_from_correction_${Date.now()}`,
            name: `New pattern from correction: ${correction.reason.substring(0,30)}`,
            description: `Derived from user correction: "${correction.reason}". Original: "${correction.original}", Corrected: "${correction.corrected}".`,
            pattern: {
                conditions: feedback.context ? Object.entries(feedback.context).map(([k,v]) => `${k}_is_${v}`) : ['general_context'],
                approach: `Approach based on correction: ${correction.corrected}`,
                techniques: this.extractTechniques([correction.corrected]), // Infer techniques
                sequence: [ // Simplified sequence
                    `Initial state: Problem related to "${correction.original}"`,
                    `Apply correction: Transition to "${correction.corrected}"`,
                    `Rationale: ${correction.reason}`
                ]
            },
            performance: {
                successRate: correction.confidence * 0.8, // Initial optimistic success rate
                averageQuality: correction.confidence * 0.8,
                usageCount: 0,
                lastUsed: Date.now()
            },
            applicableContexts: { // Infer applicability
                problemTypes: feedback.context?.problemType ? [feedback.context.problemType as string] : [],
                domains: feedback.context?.domain ? [feedback.context.domain as string] : [],
                complexityRange: { min: (feedback.context?.complexity as number) || 3, max: (feedback.context?.complexity as number) || 7 },
                userTypes: [],
                similarityThreshold: 0.7 // Default threshold for new patterns
            },
            learnedFrom: {
                feedbackIds: [feedback.id],
                exampleIds: [],
                discoveryMethod: 'feedback_correction',
                confidence: correction.confidence
            },
            metadata: { created: Date.now(), lastUpdated: Date.now(), version: '1.0' }
        };
        this.cognitiveState.recognizedPatterns.push(newPattern);
        this.cognitiveState.learningEngine.stats.patternsRecognized++;
        console.log(`LEARNING: Created new pattern "${newPattern.name}" based on correction.`);
    }
    this.cognitiveState.learningEngine.lastActivity.patternAnalysis = Date.now();
}

private async updatePatternsFromPreferences(preferences: { aspect: string; preference: string; strength: number }[], feedback: UserFeedback): Promise<void> {
    console.log(`LEARNING: Updating patterns based on ${preferences.length} preferences for session ${feedback.sessionId}.`);

    for (const pref of preferences) {
        console.log(`LEARNING: Processing preference - Aspect: "${pref.aspect}", Preference: "${pref.preference}", Strength: ${pref.strength}`);
        let ruleCreated = false;

        // Define mappings for preference aspects to adaptation modifications
        let adaptationModifications: Record<string, any> = {};
        let adjustmentType: AdaptationRule['adaptation']['adjustmentType'] = 'parameter_tuning'; // Default
        let targetPriority: AdaptationRule['metadata']['priority'] = 'low';

        switch (pref.aspect.toLowerCase()) {
            case 'reasoning_style':
                adjustmentType = 'strategy_modification';
                if (pref.preference.toLowerCase() === 'concise') {
                    adaptationModifications = { targetBrevity: 1.0, targetVerbosity: 0.2 }; // Hypothetical params
                } else if (pref.preference.toLowerCase() === 'detailed') {
                    adaptationModifications = { targetBrevity: 0.2, targetVerbosity: 1.0 };
                } else if (pref.preference.toLowerCase() === 'step_by_step') {
                    adaptationModifications = { preferSequentialThinking: true, ensureFullTrace: true };
                }
                targetPriority = 'medium';
                break;
            case 'level_of_detail':
                adjustmentType = 'parameter_tuning';
                adaptationModifications = {
                    detailLevelGlobalModifier: pref.preference.toLowerCase() === 'high' ? 0.2 : (pref.preference.toLowerCase() === 'low' ? -0.2 : 0)
                }; // Modifies a global detail parameter
                targetPriority = 'medium';
                break;
            case 'risk_tolerance':
                adjustmentType = 'strategy_modification';
                if (pref.preference.toLowerCase() === 'low' || pref.preference.toLowerCase() === 'cautious') {
                    adaptationModifications = { riskAversionFactor: 0.8, preferHighConfidencePatterns: true };
                } else if (pref.preference.toLowerCase() === 'high' || pref.preference.toLowerCase() === 'experimental') {
                    adaptationModifications = { riskAversionFactor: 0.3, allowLowerConfidencePatterns: true };
                }
                targetPriority = 'high'; // Risk is important
                break;
            case 'output_format':
                // This might be too specific for general pattern adaptation,
                // but could influence template selection or post-processing.
                // For now, we'll log it.
                console.log(`LEARNING: Output format preference "${pref.preference}" noted. May require specific output templating changes not directly tied to reasoning patterns.`);
                continue; // Skip rule creation for this aspect for now
            default:
                console.log(`LEARNING: Unknown preference aspect "${pref.aspect}". Skipping direct adaptation rule creation.`);
                continue;
        }

        if (Object.keys(adaptationModifications).length > 0) {
            const ruleId = `adapt_pref_${pref.aspect.replace(/_/g, '')}_${Date.now()}`;
            const adaptationRule: AdaptationRule = {
                id: ruleId,
                name: `Adapt to preference: ${pref.aspect} = ${pref.preference}`,
                description: `Adapt based on user preference for ${pref.aspect} to be ${pref.preference}. Strength: ${pref.strength}.`,
                trigger: {
                    // Trigger conditions could be more sophisticated, e.g., based on user profile or task type from feedback.context
                    conditions: feedback.context?.problemType ? [`user_id_is: ${feedback.context.problemType}`] : [`session_type_is: ${feedback.sessionType}`],
                    threshold: pref.strength * 0.7, // Only trigger if preference strength is significant
                    frequency: 3600000 * 6 // Check every 6 hours for persistent preferences
                },
                adaptation: {
                    adjustmentType: adjustmentType,
                    modifications: adaptationModifications,
                    expectedImprovement: 0.05 + (0.1 * pref.strength) // Modest expected improvement
                },
                evidence: {
                    supportingFeedback: [feedback.id],
                    supportingPatterns: [], // Preferences might not map to specific patterns but general behavior
                    performanceData: [],
                    confidence: pref.strength
                },
                application: { appliedCount: 0, successRate: 0, lastApplied: 0, effectMeasured: false },
                metadata: { created: Date.now(), lastUpdated: Date.now(), priority: targetPriority }
            };
            this.cognitiveState.adaptationRules.push(adaptationRule);
            this.cognitiveState.learningEngine.stats.adaptationsApplied++;
            console.log(`LEARNING: Created adaptation rule for preference: "${adaptationRule.name}".`);
            ruleCreated = true;
        }

        // Additionally, preferences could directly influence the "score" or "applicability" of existing patterns
        // For example, if a user prefers "concise" reasoning, patterns known to be verbose might get a temporary penalty.
        // This is more complex and would require a dynamic scoring mechanism during pattern selection.
        // For now, we log this potential enhancement:
        if (!ruleCreated) {
             console.log(`LEARNING: Preference for ${pref.aspect} = ${pref.preference} (strength ${pref.strength}) noted. Could be used for dynamic pattern scoring in future.`);
        }
    }
    this.cognitiveState.learningEngine.lastActivity.adaptationUpdate = Date.now();
}

 private async modifyStrategy(modifications: Record<string, any>): Promise<void> {
        console.log('LEARNING: Modifying strategy with modifications:', modifications);
        const { targetPatternId, newApproach, newSequence, newTechniques, conditionsToRemove, conditionsToAdd } = modifications;

        if (targetPatternId) {
            const pattern = this.cognitiveState.recognizedPatterns.find(p => p.id === targetPatternId);
            if (pattern) {
                let modified = false;
                if (newApproach && typeof newApproach === 'string') {
                    pattern.pattern.approach = newApproach;
                    modified = true;
                }
                if (newSequence && Array.isArray(newSequence)) {
                    pattern.pattern.sequence = newSequence.filter(s => typeof s === 'string');
                    modified = true;
                }
                if (newTechniques && Array.isArray(newTechniques)) {
                    pattern.pattern.techniques = Array.from(new Set([...pattern.pattern.techniques, ...newTechniques.filter(t => typeof t === 'string')]));
                    modified = true;
                }
                if (conditionsToRemove && Array.isArray(conditionsToRemove)) {
                    pattern.pattern.conditions = pattern.pattern.conditions.filter(c => !conditionsToRemove.includes(c));
                    modified = true;
                }
                if (conditionsToAdd && Array.isArray(conditionsToAdd)) {
                    pattern.pattern.conditions = Array.from(new Set([...pattern.pattern.conditions, ...conditionsToAdd.filter(c => typeof c === 'string')]));
                    modified = true;
                }

                if (modified) {
                    pattern.metadata.lastUpdated = Date.now();
                    pattern.metadata.version = (parseFloat(pattern.metadata.version || "1.0") + 0.1).toFixed(1);
                    console.log(`Pattern ${targetPatternId} strategy modified.`);
                }
            } else {
                console.warn(`Pattern ${targetPatternId} not found for strategy modification.`);
            }
        } else {
            console.warn('No targetPatternId provided for strategy modification.');
            // Potentially create a new pattern if modifications are substantial and no target is given
        }
        this.cognitiveState.learningEngine.lastActivity.adaptationUpdate = Date.now();
    }

private async tuneParameters(modifications: Record<string, any>): Promise<void> {
    console.log('LEARNING: Tuning parameters with modifications:', modifications);
    // Example: Tuning parameters in the learning engine's configuration
    if (modifications.feedbackWeight !== undefined) {
        this.cognitiveState.learningEngine.configuration.feedbackWeight = Math.max(0, Math.min(1, modifications.feedbackWeight));
        console.log(`LEARNING: Tuned feedbackWeight to ${this.cognitiveState.learningEngine.configuration.feedbackWeight}.`);
    }
    if (modifications.patternThreshold !== undefined) {
        this.cognitiveState.learningEngine.configuration.patternThreshold = Math.max(0, Math.min(1, modifications.patternThreshold));
        console.log(`LEARNING: Tuned patternThreshold to ${this.cognitiveState.learningEngine.configuration.patternThreshold}.`);
    }
    if (modifications.adaptationAggressiveness !== undefined) {
        this.cognitiveState.learningEngine.configuration.adaptationAggressiveness = Math.max(0, Math.min(1, modifications.adaptationAggressiveness));
        console.log(`LEARNING: Tuned adaptationAggressiveness to ${this.cognitiveState.learningEngine.configuration.adaptationAggressiveness}.`);
    }
    if (modifications.exampleInfluence !== undefined) {
        this.cognitiveState.learningEngine.configuration.exampleInfluence = Math.max(0, Math.min(1, modifications.exampleInfluence));
        console.log(`LEARNING: Tuned exampleInfluence to ${this.cognitiveState.learningEngine.configuration.exampleInfluence}.`);
    }

    // Tuning for other relevant system parameters
    if (modifications.sequentialThinkingMaxThoughts !== undefined) {
        // Assuming there's a global setting for maxThoughts or it's stored in cognitive state
        // This might need adjustment based on where this parameter is actually stored and used
        const maxThoughts = Math.max(3, Math.min(20, modifications.sequentialThinkingMaxThoughts));
        // Example: If maxThoughts is a direct property of cognitiveState
        this.cognitiveState.activeSequentialThinking.forEach(thinking => thinking.totalThoughtsEstimate = maxThoughts);
        console.log(`LEARNING: Tuned sequentialThinkingMaxThoughts to ${maxThoughts}.`);
    }

    if (modifications.hypothesisConfidenceThreshold !== undefined) {
        // Assuming a global setting for hypothesis confidence threshold
        const threshold = Math.max(0.1, Math.min(0.9, modifications.hypothesisConfidenceThreshold));
        // Example: If there's a dedicated field in cognitiveState for this
        // this.cognitiveState.hypothesisConfidenceThreshold = threshold;
        console.log(`LEARNING: Tuned hypothesisConfidenceThreshold to ${threshold}.`);
    }

    if (modifications.minRelevanceForMemory !== undefined) {
         const relevance = Math.max(0.0, Math.min(1.0, modifications.minRelevanceForMemory));
         // Example: Apply to working memory configuration or retrieval logic
         // this.cognitiveState.workingMemory.minRelevanceThreshold = relevance;
         console.log(`LEARNING: Tuned minRelevanceForMemory to ${relevance}`);
    }

    // Add tuning for other relevant system parameters (e.g., maxThoughts in sequential thinking, confidence thresholds)
    this.cognitiveState.learningEngine.lastActivity.adaptationUpdate = Date.now();
}

private async updateApproachSelection(modifications: Record<string, any>): Promise<void> {
    console.log('LEARNING: Updating approach selection logic with modifications:', modifications);
    // This is complex. Could involve:
    // 1. Modifying 'conditions' of existing ReasoningPatterns.
    // 2. Changing the 'confidence' or 'priority' of AdaptationRules that select certain approaches.
    // 3. Adjusting weights in a hypothetical decision model for selecting approaches.

    if (modifications.prioritizePatternId && modifications.contextConditions) {
        const pattern = this.cognitiveState.recognizedPatterns.find(p => p.id === modifications.prioritizePatternId);
        if (pattern) {
            // Example: Add new conditions that make this pattern more likely to be selected
            pattern.pattern.conditions.push(...(modifications.contextConditions as string[]));
            pattern.learnedFrom.confidence = Math.min(1, pattern.learnedFrom.confidence + 0.1); // Boost confidence
            pattern.metadata.lastUpdated = Date.now();
            console.log(`LEARNING: Updated conditions for pattern "${pattern.name}" to alter approach selection.`);
        }
    }
    // This would require a more sophisticated mechanism for approach selection than currently defined.
    // For now, this is a high-level placeholder.
    this.cognitiveState.learningEngine.lastActivity.adaptationUpdate = Date.now();
}

private async emphasizeTechniques(modifications: Record<string, any>): Promise<void> {
    console.log('LEARNING: Emphasizing techniques with modifications:', modifications);
    const { techniquesToEmphasize, emphasisFactor = 0.05 } = modifications; // emphasisFactor (0 to 1)

    if (Array.isArray(techniquesToEmphasize) && techniquesToEmphasize.length > 0) {
        for (const pattern of this.cognitiveState.recognizedPatterns) {
            const emphasizedTechniquesInPattern = pattern.pattern.techniques.filter(tech => techniquesToEmphasize.includes(tech));
            if (emphasizedTechniquesInPattern.length > 0) {
                // Increase quality/success metrics for patterns using these techniques
                pattern.performance.averageQuality = Math.min(1, pattern.performance.averageQuality + (emphasisFactor * emphasizedTechniquesInPattern.length));
                pattern.performance.successRate = Math.min(1, pattern.performance.successRate + (emphasisFactor * emphasizedTechniquesInPattern.length / 2));
                pattern.metadata.lastUpdated = Date.now();
                console.log(`LEARNING: Emphasized techniques in pattern "${pattern.name}". New avgQuality: ${pattern.performance.averageQuality.toFixed(2)}`);
            }
        }

        for (const rule of this.cognitiveState.adaptationRules) {
            if (rule.adaptation.modifications.emphasizedTechniques) {
                 const currentEmphases = rule.adaptation.modifications.emphasizedTechniques as string[];
                 const newEmphases = new Set([...currentEmphases, ...techniquesToEmphasize]);
                 rule.adaptation.modifications.emphasizedTechniques = Array.from(newEmphases);
                 rule.evidence.confidence = Math.min(1, rule.evidence.confidence + emphasisFactor);
                 rule.metadata.lastUpdated = Date.now();
                 console.log(`LEARNING: Updated emphasized techniques in adaptation rule "${rule.name}".`);
            }
        }
    }
    this.cognitiveState.learningEngine.lastActivity.adaptationUpdate = Date.now();
}
}

// Start the server
const server = new BrainiacMCPServer();
server.run().catch(console.error);

function deepMerge<T extends Record<string, any>>(
    target: T, // Corresponds to defaultState in the original context
    source: Record<string, any> // Corresponds to loadedData in the original context
): T {
    const isObject = (item: any): boolean => {
        // Helper function to check if a value is a plain JavaScript object
        return item && typeof item === 'object' && !Array.isArray(item);
    };

    // Start with a shallow copy of the target.
    // Properties from source will overwrite or be added to this,
    // respecting the original undefined handling.
    const output = { ...target };

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const sourceValue = source[key];
            const targetValueForKey = target[key]; // Value from the original target for this key

            // Handle original behavior: if source value is undefined, keep target's value for that key.
            if (sourceValue === undefined) {
                // output[key] is already target[key] due to {...target},
                // but explicit assignment clarifies intent if target might not have the key (though {...target} covers it).
                if (target.hasOwnProperty(key)) {
                    output[key as keyof T] = targetValueForKey as T[keyof T];
                } else {
                    // If target doesn't have the key, and source value is undefined,
                    // then the key should not be in the output unless explicitly desired.
                    // For a merge, if source has key:undefined, it usually means key:undefined in result.
                    // However, original logic was: `loadedData[key] !== undefined ? loadedData[key] : defaultState[key]`
                    // This implies if loadedData[key] is undefined, use defaultState[key].
                    // My current logic: if sourceValue is undefined, output[key] remains targetValueForKey.
                    // This is consistent.
                }
                continue; // Skip further processing for this key if source value is undefined
            }

            if (isObject(targetValueForKey) && isObject(sourceValue)) {
                // Recursively merge nested objects
                output[key as keyof T] = deepMerge(targetValueForKey as Record<string, any>, sourceValue) as T[keyof T];
            } else if (Array.isArray(targetValueForKey) && Array.isArray(sourceValue)) {
                // Concatenate arrays as per the original selection's logic
                output[key as keyof T] = [...targetValueForKey, ...sourceValue] as T[keyof T];
            } else if (targetValueForKey instanceof Map && sourceValue instanceof Map) {
                // Merge Maps: entries from source will overwrite target for the same keys
                output[key as keyof T] = new Map([...targetValueForKey, ...sourceValue]) as T[keyof T];
            } else if (targetValueForKey instanceof Map && Array.isArray(sourceValue)) {
                // Handle case where sourceValue is an array of [key, value] pairs (e.g., from JSON deserialization)
                // Check if sourceValue is an array of pairs.
                if (sourceValue.every(item => Array.isArray(item) && item.length === 2)) {
                    try {
                        output[key as keyof T] = new Map([...targetValueForKey, ...sourceValue]) as T[keyof T];
                    } catch (e) {
                        console.warn(`deepMerge: Could not construct Map from array for key "${key}". Using source array directly. Error: ${e}`);
                        output[key as keyof T] = sourceValue as T[keyof T]; // Fallback to source value
                    }
                } else {
                    // If sourceValue is an array but not of pairs, and target is a Map,
                    // this merge is ill-defined. Overwrite with sourceValue.
                    console.warn(`deepMerge: Attempted to merge non-pair array into Map for key "${key}". Using source array directly.`);
                    output[key as keyof T] = sourceValue as T[keyof T];
                }
            } else {
                // Source value is not undefined, and not a special merge case (object, array, Map).
                // Assign the source value, overwriting the target's value for this key.
                output[key as keyof T] = sourceValue as T[keyof T];
            }
        }
    }
    return output;
}
