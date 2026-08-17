import mongoose, { Mongoose, Schema } from "mongoose";


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
})

const EdgeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    }
}, {
    _id: false,

})

const PositionSchema = new Schema({
    x: {
        type: String,
        required: true
    },
    y: {
        type: String,
        required: true
    }
})

const NodeDataSchema = new Schema({
    kind: {
        type: String,
        required: true
    },
    enum: ["ACTION", "TRIGGER"],
    metadata: Schema.Types.Mixed
}, {
    _id: false
})

const WorkflowNodeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    position: PositionSchema,
    credentials: {
        type: Schema.Types.Mixed
    },
    nodeId: {
        type: mongoose.Types.ObjectId,
        ref: "Node",
        required: true
    },
    data: NodeDataSchema
}, {
    _id: false
})

const WorkflowSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    nodes: [WorkflowNodeSchema],
    edges: [EdgeSchema]
})

const CredentialTypes = new Schema({
    title : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true,
    },
    required : {
        type : Boolean,
        required : true
    }
})

const NodeSchema = new Schema({
    id : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    type : {
        type : String,
        enum : ["ACTION","TRIGGER"],
        required : true
    },
    credentialTypes : [CredentialTypes]
})

const ExecutionSchema = new Schema({
    _id : {
        type : String,
        required : true
    },
    workflowId : {
        type : mongoose.Types.ObjectId,
        ref : "Workflow",
        required : true
    },
    status : {
        type : String,
        enum : ["Pending","Success"]
    },
    startTime : {
        type : Date,
        default : Date.now,
        required : true
    },
    endTime : {
        type : Date,
    }
})

const RefreshTokenSchema = new Schema(
    {
        userId : {
            type : mongoose.Types.ObjectId,
            ref : "User",
            required : true
        },
        jti : {
            type : String,
            required : true,
            unique : true
        },
        expiresAt : {
            type : Date,
            required : true,
            expires : 0
        }
    },
    {
        timestamps : true
    }
)

export const UserModel = mongoose.model("User", UserSchema);
export const WorkflowModel = mongoose.model("Workflow", WorkflowSchema);
export const NodeModel = mongoose.model("Node",NodeSchema);
export const ExecutionModel = mongoose.model("Execution",ExecutionSchema);
export const RefreshTokenModel = mongoose.model("RefreshToken",RefreshTokenSchema);