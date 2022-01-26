export default function reducer(state, action) {
    switch (action.type) {
        case "ADD_JOB":
            return {
                ...state,
                pendingJobs: [...state.pendingJobs, action.payload], 
            };
        case "UPDATE_PENDING_LIST":
            return {
                ...state,
                pendingJobs: action.payload, 
            };
        case "ADD_COMPLETE_JOB":
            return {
                ...state,
                completedJobs: [...state.completedJobs, action.payload],
            };
        case "ADD_CANCEL_JOB":
            return {
                ...state,
                cancelledJobs: [...state.cancelledJobs, action.payload],
            };
        case "UPDATE_SIZE":
            return {
                ...state,
                size: action.payload,
            };
        case "UPDATE_COMPLETED_SIZE":
            return {
                ...state,
                size: action.payload,
            };
        case "UPDATE_EMPTY":
            return {
                ...state,
                isEmpty: action.payload,
            };
        case "UPDATE_WORKING_ITEM":
            return {
                ...state,
                workingItem: action.payload,
            };
        case "REFRESH":
            return {
                ...state,
                pendingJobs: []
            }
        case "UPDATE_WORKING_ITEM_PROGRESS":
            return {
                ...state,
                workingItemProgress: action.payload
            }
        default:
            return state;
    }
}