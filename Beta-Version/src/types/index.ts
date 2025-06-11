// MCP Tool Types for Reasoning Engine
export interface ReasoningTool {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: Record<string, any>;
        required?: string[];
    };
}

// Working Memory Types
export interface WorkingMemoryItem {
    id: string;
    content: any;
    timestamp: number;
    relevance: number;
    context: string;
    expiresAt?: number;
}

export interface WorkingMemory {
    items: WorkingMemoryItem[];
    capacity: number;
    currentLoad: number;
}

// Cognitive Processing Types
export interface ReasoningStep {
    id: string;
    type: 'analysis' | 'synthesis' | 'evaluation' | 'inference'| 'correction_application'| 'pattern_recognition' | 'adaptation';
    input: any;
    output: any;
    confidence: number;
    reasoning: string;
    timestamp: number;
    metadata: { correctionDetails?: any; [key: string]: any; };
}

export interface ReasoningChain {
    id: string;
    steps: ReasoningStep[];
    startTime: number;
    endTime?: number;
    status: 'active' | 'completed' | 'revised_after_assessment' | 'failed'| 'paused';
    goal: string;
}

// Memory Operation Types
export interface MemoryOperation {
    type: 'store' | 'retrieve' | 'update' | 'delete';
    target: string;
    data?: any;
    filters?: Record<string, any>;
}

export interface MemoryResult {
    success: boolean;
    data?: any;
    error?: string;
    metadata?: {
        itemsAffected: number;
        executionTime: number;
    };
}

export interface ConstitutionalInput {
    autoApplyCorrections: boolean;
    includeCorrections: boolean; // Changed from any
    frameworkId?: string; // Made optional as per previous context
    targetType: 'reasoning_chain' | 'sequential_thinking' | 'react_cycle' | ''; 
    targetId: string;
    // reasoningChainId: string; // Potentially redundant if targetId and targetType cover it
    // constitutionalFrameworkId: string; // Potentially redundant if frameworkId covers it
    context?: Record<string, any>;
    maxViolations?: number;
    confidenceThreshold?: number;
}

export interface ConstitutionalOutput {
    assessment: SelfAssessment;
    corrections: CorrectionSuggestion[]; // Changed from any
    metrics: QualityMetrics; // Assuming QualityMetrics is defined
    recommendations: string[];
    improvementPlan: string[];
    result: string; // Or a more specific type
    reasoning: string[]; // Or a more specific type
    constitutional_check: boolean;
    violations?: string[];
    confidence: number;
}

// New type for more structured learning logs
export interface LearningLogEntry {
    id: string;
    timestamp: number;
    message: string;
    sourceActionId?: string;
    sourceActionName?: string;
    sessionId?: string;
    cycleId?: string; // If your ReActCycle has an ID
    tags?: string[];
    severity?: 'info' | 'warning' | 'error';
}

// Performance Tracker Types
export interface PerformanceTracker {
    // Example properties - adjust to your actual definition
    totalSessions: number;
    successfulSessions: number;
    averageCyclesPerSession: number;
    lastUpdated: number;
    // ... other metrics
}

// Cognitive State Types
export interface CognitiveState {
    performanceHistory: any;
    cycleHistory: ReActCycle[];
    workingMemory: KnowledgeGraphMemory;
    activeReasoningChains: ReasoningChain[];
    activeSequentialThinking: SequentialThinking[];
    activeReActSessions: ReActSession[];
    activeCritiqueSessions: CritiqueSession[];
    constitutionalFramework: ConstitutionalFramework;
    assessmentHistory: SelfAssessment[];
    qualityMetrics: QualityMetrics[]; // Ensure this matches or is compatible with calculateQualityMetrics output
    processingLoad: number;
    attention: string[];
    context: Record<string, any>;
    actionHistory: Action[];
    observationHistory: Observation[];
    learningsLog: LearningLogEntry[]; // Changed from learningsDatabase: string[]
    learningsDatabase: LearningLogEntry[];
    learningEngine: LearningEngine;
    userFeedbackHistory: UserFeedback[];
    recognizedPatterns: ReasoningPattern[];
    adaptationRules: AdaptationRule[];
    exampleDatabase: LearningExample[];
    performanceTracker: PerformanceTracker;


}

// MCP Resource Types
export interface KnowledgeResource {
    uri: string;
    name: string;
    description: string;
    mimeType: string;
    metadata: {
        domain: string;
        reliability: number;
        lastUpdated: number;
        accessCount: number;
    };
}

// Tool Input/Output Types
export interface ReasoningInput {
    query: string;
    context?: Record<string, any>;
    constraints?: string[];
    maxSteps?: number;
    useWorkingMemory?: boolean;
}

export interface ReasoningOutput {
    result: any;
    reasoning: ReasoningChain;
    confidence: number;
    sources: string[];
    workingMemoryUpdates?: WorkingMemoryItem[];
}

export interface MemoryInput {
    operation: MemoryOperation;
    context?: string;
}

export interface MemoryOutput extends MemoryResult {
    cognitiveImpact?: {
        relevanceScore: number;
        memoryPressure: number;
    };
}

// Advanced Knowledge Graph Memory Types
export interface Entity {
    id: string;
    name: string;
    type: string;
    observations: string[];
    metadata: {
        created: number;
        lastUpdated: number;
        relevanceScore: number;
        accessCount: number;
    };
}

export interface Relation {
    id: string;
    from: string; // entity name
    to: string;   // entity name
    type: string;
    strength: number; // 0-1
    metadata: {
        created: number;
        lastAccessed: number;
        confidence: number;
    };
}

export interface KnowledgeGraph {
    entities: Map<string, Entity>;
    relations: Relation[];
    metadata: {
        totalEntities: number;
        totalRelations: number;
        lastUpdated: number;
    };
}

export interface SemanticQuery {
    query: string;
    entityTypes?: string[];
    relationTypes?: string[];
    maxResults?: number;
    minRelevance?: number;
}

export interface SemanticResult {
    entities: Entity[];
    relations: Relation[];
    relevanceScores: number[];
    searchMetadata: {
        totalMatches: number;
        searchTime: number;
        queryComplexity: number;
    };
}

export interface KnowledgeGraphMemory {
    knowledgeGraph: KnowledgeGraph;
    semanticCache: Map<string, SemanticResult>;
    indexingMetadata: {
        lastFullIndex: number;
        incrementalUpdates: number;
    };
    items: WorkingMemoryItem[]; // Add this
    capacity: number;          // Change 'any' to 'number'
    currentLoad: number;       // Change 'any' to 'number'
    lastAccessedEntity?: string;
    accessFrequency?: Map<string, number>;
}

// Dynamic Sequential Thinking Types
export interface ThoughtStep {
    id: string;
    thoughtNumber: number;
    content: string;
    confidence: number;
    timestamp: number;
    metadata: {
        isRevision: boolean;
        revisesThought?: number;
        branchFromThought?: number;
        branchId?: string;
        needsMoreThoughts: boolean;
        correctionDetails?: any;
    };
}

export interface ThoughtBranch {
    description: any;
    id: string;
    parentThought: number;
    confidence: number;
    outcome?: {
        summary: string;
        confidence: number;
    };
    thoughts: ThoughtStep[];
    isActive: boolean;
    quality: number; // 0-1
    status?: string;
}

export interface HypothesisTest {
    id: string;
    hypothesis: string;
    evidence: string[];
    counterEvidence: string[];
    confidence: number;
    status: 'forming' | 'testing' | 'verified' | 'refuted';
    timestamp: number;
}

export interface SequentialThinking {
    id: string;
    goal: string;
    currentThought: number;
    totalThoughtsEstimate: number;
    thoughts: ThoughtStep[];
    branches: ThoughtBranch[];
    hypotheses: HypothesisTest[];
    isComplete: boolean;
    finalAnswer?: string;
    status: 'active' | 'completed' | 'failed' | 'paused' | 'awaiting_user_input' | 'needs_input_from_user'| 'needs_revision' | 'needs_extension'; 
    metadata: {
        startTime: number;
        endTime?: number;
        totalRevisions: number;
        branchingPoints: number;
        complexityScore: number;
    };
    lastUpdated?: number; // Add this line (optional if not always set immediately)
}


export interface SequentialThinkingInput {
    problem: string;
    context?: Record<string, any>;
    initialThoughts?: string[];
    maxThoughts?: number;
    allowBranching?: boolean;
    requireHypotheses?: boolean;
    targetConfidence?: number;
}

export interface SequentialThinkingOutput {
    thinking: SequentialThinking;
    finalAnswer: string;
    confidence: number;
    reasoning: string;
    metadata: {
        thoughtCount: number;
        revisionCount: number;
        branchCount: number;
        solutionPath: number[];
    };
}

// ReAct Action-Observation Cycle Types
export interface Action {
    id: string;
    name: string;
    // Modify this line to include 'planning_step'
    type: "tool_call" | "memory_operation" | "knowledge_query" | "reasoning_step" | "simulation" | "planning_step" |'memory_operation_store' | "knowledge_retrieval";
    parameters: any;
    expectedOutcome: string;
    confidence: number;
    timestamp: number;
    result?: any;
    status?: 'pending' | 'in_progress' | 'completed' | 'failed';
    error?: string;
    retries?: number;
    dependencies?: string[];
}

export interface Observation {
    content: any;
    id: string;
    actionId: string;
    outcome: any;
    success: boolean;
    timestamp: number;
    learningPoints: string[];
    confidence: number;
}

// filepath: src/types/index.ts (or your types file)


export interface ActionPlan {
    id: string;
    goal: string;
    actions: Action[]; // Assuming Action type is defined
    currentActionIndex: number;
    // Modify this line to include 'planning' and other statuses you use
    status: 'in_progress' | 'completed' | 'failed' | 'draft' | 'planning' | 'executing' | 'needs_revision' | 'needs_extension';
    startTime?: number;
    endTime?: number;
    lastUpdated?: number;
    // ... other properties
}


// filepath: src/types/index.ts (or your types file)
export interface Action {
    id: string;
    name: string;
    // Modify this line to include 'knowledge_retrieval'
    type: "tool_call" | "memory_operation" | "knowledge_query" | "reasoning_step" | "simulation" | "planning_step" |'memory_operation_store' | "knowledge_retrieval";
    parameters: any;
    expectedOutcome: string;
    confidence: number;
    timestamp: number;
    result?: any;
    status?: 'pending' | 'in_progress' | 'completed' | 'failed';
    error?: string;
    retries?: number;
    dependencies?: string[];
}


export interface ReActCycle {
    id: string;
    reasoning: string;
    action: Action;
    observation: Observation;
    reflection: string;
    nextStepPlan: string;
    timestamp: number;
    confidence: number;
}

export interface ReActSession {
    lastUpdated: number;
    id: string;
    goal: string;
    cycles: ReActCycle[];
    actionPlan: ActionPlan;
    status: 'active' | 'completed' | 'failed' | 'paused' | 'failed_max_cycles' | 'awaiting_user_input'; 
    startTime: number;
    endTime?: number;
    finalOutcome?: string;
    learningsSummary: string[];
    maxCycles?: number;
    
}

export interface UserInterventionInput {
    sessionId: string; // ID of the SequentialThinking or ReActSession
    sessionType: 'sequential_thinking' | 'react_session';
    interventionType: 'thought_correction' | 'action_override' | 'provide_guidance';
    payload: any; // e.g., { thoughtNumberToCorrect: 5, newContent: "..." } or { nextAction: Action }
}

export interface ReActInput {
    goal: string;
    context?: Record<string, any>;
    maxCycles?: number;
    allowedActions?: string[];
    simulationMode?: boolean;
}

export interface ReActOutput {
    session: ReActSession;
    finalResult: any;
    actionsTaken: Action[];
    observationsMade: Observation[];
    learnings: string[];
    confidence: number;
}

// Constitutional Self-Critique System Types
export interface ReasoningPrinciple {
    id: string;
    name: string;
    description: string;
    weight: number; // 0-1, importance of this principle
    guidelines: string[];
    evaluationCriteria: string[];
    thresholds: {
        excellent: number; // 0.8-1.0
        good: number;      // 0.6-0.8
        acceptable: number; // 0.4-0.6
        poor: number;      // 0.0-0.4
    };
}

export interface ConstitutionalFramework {
    id: string;
    name: string;
    description: string;
    principles: ReasoningPrinciple[];
    version: string;
    created: number;
    lastUpdated: number;
}

export interface ReasoningFlaw {
    id: string;
    type: 'logical_fallacy' | 'missing_evidence' | 'bias' | 'inconsistency' | 'incomplete_analysis' | 'circular_reasoning' | 'unclear_reasoning' | 'potential_bias' | 'complete_analysis';
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    location: string; // Where in the reasoning this flaw occurs
    evidence: string[];
    confidence: number; // 0-1
}

export interface CorrectionSuggestion {
    id: string;
    flawId: string;
    type: 'gather_evidence' | 'alternative_perspective' | 'logical_restructure' | 'bias_mitigation' |'general_improvement' | 'logical_flaw'| 'missing_evidence' | 'incomplete_analysis' | 'unclear_reasoning' | 'potential_bias' | 'complete_analysis';
    description: string;
    actionable: boolean;
    priority: 'low' | 'medium' | 'high';
    expectedImprovement: number; // 0-1
    implementation: string;
    targetComponent?: string; // Add this line (make it optional with '?' if it's not always present)
    suggestedChange: string;
}

export interface PrincipleAssessment {
    principleId: string;
    score: number; // 0-1
    evaluation: 'excellent' | 'good' | 'acceptable' | 'poor';
    evidence: string[];
    flaws: ReasoningFlaw[];
    suggestions: CorrectionSuggestion[];
    confidence: number;
}

export interface SelfAssessment {
    id: string;
    critique: string;
    targetId: string; // ID of reasoning chain, thinking session, or ReAct cycle being assessed
    targetType: 'reasoning_chain' | 'sequential_thinking' | 'react_cycle';
    frameworkId: string;
    overallScore: number; // 0-1
    overallEvaluation: 'excellent' | 'good' | 'acceptable' | 'poor';
    principleAssessments: PrincipleAssessment[];
    totalFlaws: number;
    totalSuggestions: number;
    timestamp: number;
    assessmentDuration: number;
}

// ...existing code...
export interface QualityMetrics {
    id: string;
    accuracy?: number;
    completeness?: number;
    consistency?: number;
    clarityScore: number;
    unclear_reasoning: number; 
    timeframe: {
        start: number;
        end: number;
    };
    assessmentCount: number;
    averageScore: number;
    scoreDistribution: {
        excellent: number;
        good: number;
        acceptable: number;
        poor: number;
    };
    commonFlaws: {
        type: string;
        frequency: number;
        averageSeverity: string;
    }[];
    improvementTrends: {
        principle: string;
        trendDirection: 'improving' | 'stable' | 'declining';
        changeRate: number;
    }[];
    correctionEffectiveness: {
        applied: number;
        successful: number;
        effectiveness: number;
    };
}

export interface CritiqueSession {
    id: string;
    goal: string;
    targetAssessments: SelfAssessment[];
    overallMetrics: QualityMetrics;
    recommendations: string[];
    correctionsPlan: CorrectionSuggestion[];
    status: 'active' | 'completed' | 'paused';
    startTime: number;
    endTime?: number;
    learnings: string[];
}

// Learning and Adaptation Engine Types
export interface UserFeedback {
    id: string;
    sessionId: string; // ID of reasoning session being evaluated
    sessionType: 'reasoning_chain' | 'sequential_thinking' | 'react_cycle' | 'constitutional_assessment';
    feedbackType: 'correction' | 'preference' | 'rating' | 'suggestion';
    rating?: number; // 1-5 scale
    corrections: {
        original: string;
        corrected: string;
        reason: string;
        confidence: number;
    }[];
    preferences: {
        aspect: string; // 'reasoning_style', 'detail_level', 'approach_type', etc.
        preference: string;
        strength: number; // 0-1
    }[];
    suggestions: string[];
    context: {
        problemType: string;
        domain: string;
        complexity: number;
        userExperience: string;
    };
    timestamp: number;
    userId?: string;
}


export interface AdaptationRule {
    id: string;
    name: string;
    description: string;
    trigger: {
        conditions: string[]; // When to apply this rule
        threshold: number; // Confidence threshold
        frequency: number; // How often to check
    };
    adaptation: {
        adjustmentType: 'strategy_modification' | 'parameter_tuning' | 'approach_selection' | 'technique_emphasis';
        modifications: Record<string, any>; // Specific changes to make
        expectedImprovement: number; // 0-1
    };
    evidence: {
        supportingFeedback: string[];
        supportingPatterns: string[];
        performanceData: any[];
        confidence: number;
    };
    application: {
        appliedCount: number;
        successRate: number;
        lastApplied: number;
        effectMeasured: boolean;
    };
    metadata: {
        created: number;
        lastUpdated: number;
        priority: 'low' | 'medium' | 'high' | 'critical';
    };
}

export interface LearningExample {
    id: string;
    title: string;
    description: string;
    example: {
        input: any; // Problem or query
        context: Record<string, any>;
        expectedApproach: string;
        idealProcess: string[];
        expectedOutput: any;
    };
    demonstration: {
        actualProcess: any[]; // Steps actually taken
        actualOutput: any;
        qualityRating: number; // 0-1
        annotations: string[]; // Key insights and explanations
    };
    learningPoints: {
        techniques: string[];
        principles: string[];
        patterns: string[];
        antiPatterns: string[]; // What to avoid
    };
    applicability: {
        problemTypes: string[];
        domains: string[];
        complexityRange: {
            min: number;
            max: number;
        };
        userTypes: string[];
        similarityThreshold: number;
    };
    impact: {
        timesReferenced: number;
        influencedPatterns: string[];
        improvementMeasured: number; // 0-1
        lastUsed: number;
    };
    metadata: {
        source: 'user_demonstration' | 'expert_example' | 'successful_session' | 'curated_case';
        created: number;
        contributor?: string;
        verified: boolean;
    };
}

export interface PerformanceTracker {
    id: string;
    timeframe: {
        start: number;
        end: number;
        period: 'hour' | 'day' | 'week' | 'month';
    };
    metrics: {
        sessionCount: number;
        averageQuality: number; // From constitutional assessments
        userSatisfaction: number; // From feedback ratings
        adaptationSuccess: number; // How well adaptations worked
        patternUtilization: number; // How often patterns were used
        improvementRate: number; // Rate of improvement over time
    };    breakdown: {
        byProblemType: Record<string, any>;
        byDomain: Record<string, any>;
        byComplexity: Record<string, any>;
        bySessionType: Record<string, any>;
    };
    trends: {
        qualityTrend: 'improving' | 'stable' | 'declining';
        satisfactionTrend: 'improving' | 'stable' | 'declining';
        adaptationTrend: 'improving' | 'stable' | 'declining';
        changeRate: number; // -1 to 1
    };
    insights: {
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        recommendations: string[];
    };
}

export interface ReasoningPattern {
    id: string;
    name: string;
    description: string;
    pattern: {
        conditions: string[]; // When this pattern applies
        approach: string; // What approach to use
        techniques: string[]; // Specific techniques involved
        sequence: string[]; // Order of operations
    };
    performance: {
        successRate: number; // 0-1
        averageQuality: number; // 0-1
        usageCount: number;
        lastUsed: number;
    };
    applicableContexts: {
        problemTypes: string[];
        domains: string[];
        complexityRange: { min: number; max: number };
        userTypes: string[];
        similarityThreshold?: number; // Add similarityThreshold here (make it optional if it's not always present)

    };
    learnedFrom: {
        feedbackIds: string[];
        exampleIds: string[];
        discoveryMethod: 'feedback_analysis' | 'pattern_mining' | 'demonstration' | 'demonstration_new' | 'performance_analysis' | 'feedback_correction'; // Add 'feedback_correction'
        confidence: number;
    };
    metadata: {
        created: number;
        lastUpdated: number;
        version: string;
    };
}

export interface AdaptationRule {
    id: string;
    name: string;
    description: string;
    trigger: {
        conditions: string[]; // When to apply this rule
        threshold: number; // Confidence threshold
        frequency: number; // How often to check
    };
    adaptation: {
        adjustmentType: 'strategy_modification' | 'parameter_tuning' | 'approach_selection' | 'technique_emphasis';
        modifications: Record<string, any>; // Specific changes to make
        expectedImprovement: number; // 0-1
    };
    evidence: {
        supportingFeedback: string[];
        supportingPatterns: string[];
        performanceData: any[];
        confidence: number;
    };
    application: {
        appliedCount: number;
        successRate: number;
        lastApplied: number;
        effectMeasured: boolean;
    };
    metadata: {
        created: number;
        lastUpdated: number;
        priority: 'low' | 'medium' | 'high' | 'critical';
    };
}

export interface LearningEngine {
    id: string;
    status: 'active' | 'learning' | 'adapting' | 'paused' |'disabled';
    configuration: {
        feedbackWeight: number; // How much to weight user feedback
        patternThreshold: number; // Threshold for pattern recognition
        adaptationAggressiveness: number; // How quickly to adapt
        exampleInfluence: number; // How much examples influence behavior
    };
    capabilities: {
        feedbackIntegration: boolean;
        patternRecognition: boolean;
        strategyAdaptation: boolean;
        demonstrationLearning: boolean;
    };
    stats: {
        totalFeedbackProcessed: number;
        patternsRecognized: number;
        adaptationsApplied: number;
        examplesLearned: number;
        improvementMeasured: number;
    };
    lastActivity: {
        feedbackProcessing: number;
        patternAnalysis: number;
        adaptationUpdate: number;
        exampleIntegration: number;
        performanceEvaluation: number;
    };
}

export interface AppliedCorrectionLogEntry {
    correctionId: string; // Changed from number to string
    timestamp: number;
    // Add other relevant fields from the app.ts usage if they should be part of this type
    targetId: string;
    targetType: string;
    principleViolated: string;
    summary: string;
}

export interface LearningInput {
    operation: 'feedback' | 'adapt' | 'demonstrate' | 'patterns' | 'metrics';
    data?: any;
    context?: Record<string, any>;
    options?: {
        immediate?: boolean;
        priority?: 'low' | 'medium' | 'high';
        forceUpdate?: boolean;
    };
}

export interface LearningOutput {
    success: boolean;
    operation: string;
    result: any;
    insights: string[];
    adaptationsApplied: string[];
    patternsUpdated: string[];
    performanceImpact: {
        expected: number;
        measured?: number;
        confidence: number;
    };
    metadata: {
        processingTime: number;
        dataPoints: number;
        confidence: number;
    };
}