import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { TaskAPIs } from "../../../apis/taskApis";
import { message, Pagination } from "antd";

const initialState = {
    isLoading: false,
    tasks: [],
    currentTask:{},
    errors:{},
    pagination: {
        currentPage: 1,
        limitPerPage: 8,
        total: 8,
    },
    searchKey: "",
};

export const actFetchAllTask = createAsyncThunk(
    'tasks/fetchAllTask',
    async(params)=>{
    const response = await TaskAPIs.getAllTasks();
    return {
        data: response.data,
        total: response.headers.get("X-Total-Count"),
        };
} );
export const actFetchTaskById = createAsyncThunk(
    "tasks/fetchTaskById",
     async(taskId)=>{
    const task = await TaskAPIs.getTaskById(taskId);
    return task;
});
export const actUpdateTaskById = createAsyncThunk(
    "tasks/updateTaskById", 
    async({id,taskUpdate})=>{
        await TaskAPIs.updateTaskById(id,taskUpdate);
        return null;
    }
);
export const actDeleteTaskById = createAsyncThunk("tasks/deleteTaskById",async(id)=>{
    await TaskAPIs.deleteTaskById(id)
    return null;
})
const taskSlice = createSlice({
    name:'tasks',
    initialState: initialState,
    reducers:{
        actSetTasks:(state,action)=>{},
        setLoading: (state,action)=>{
            state.isLoading = action.payload;
        },
        resetCurrentTask: (state, action) =>{
            state.currentTask = {}
        },

        setNewPage: (state, action)=>{
            state.pagination = {
                ...state.pagination,
                currentPage: action.payload,
            };
        },
        setSearchKey: (state, action)=>{
            state.searchKey = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actFetchAllTask.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(actFetchAllTask.rejected, (state, action)=>{
            state.errors={};
            state.isLoading = false;
        });
        builder.addCase(actFetchAllTask.fulfilled, (state, action)=>{
            state.tasks= action.payload.data;
            state.isLoading = false;
            state.pagination.total = action.payload.total;
        });
        builder.addCase(actFetchTaskById.fulfilled, (state, action)=>{
            state.currentTask = action.payload;
        });
        builder.addCase(actUpdateTaskById.fulfilled, (state, action)=>{
            message.success("Cập nhật Task thành công");
        });
        builder.addCase(actDeleteTaskById.fulfilled,(state,action)=>{
            message.success("Xoá Task thành công");
        });
    },
});
export const actCreateNewTask = (task) => {
    return async (dispatch)=>{
        try{
            await TaskAPIs.createTask(task);
            dispatch(actFetchAllTask());

        }catch(error){}
    };
};

export const {actSetTasks,setLoading, setNewPage, setSearchKey} = taskSlice.actions;
export const tasksReducer = taskSlice.reducer;