import { Request, Response } from "express";
import { Task } from "../types/task";

const dataTasks: Task[] = [
  { id: 1, title: "Belajar Express", description: "Materi TypeScript dasar", status: "completed" },
  { id: 2, title: "Ngerjain Tugas", description: "Bikin Task Management API", status: "pending" }
];

export class TaskController {
  
  // GET ALL TASKS
  getTasks = async (req: Request, res: Response) => {
    return res.status(200).json({
      status: true,
      message: "Get All Tasks Success",
      data: { tasks: dataTasks }
    });
  };

  // GET TASK BY ID
  getTaskById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = dataTasks.find(t => t.id === id);

    if (!Number.isInteger(id) || !task) {
      return res.status(404).json({
        status: false,
        message: "Tugas tidak ditemukan"
      });
    }

    return res.status(200).json({
      status: true,
      message: "Get Detail Task Success",
      data: { task }
    });
  };

  // CREATE TASK
  createTask = async (req: Request, res: Response) => {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        status: false,
        message: "Title dan description wajib diisi"
      });
    }

    if (status && status !== "pending" && status !== "completed") {
      return res.status(400).json({
        status: false,
        message: "Status harus berupa 'pending' atau 'completed'"
      });
    }

    const newId = dataTasks.length > 0 ? Math.max(...dataTasks.map(t => t.id)) + 1 : 1;

    const newTask: Task = {
      id: newId,
      title,
      description,
      status: status || "pending" 
    };

    dataTasks.push(newTask);

    return res.status(201).json({
      status: true,
      message: "Create Task Success",
      data: { task: newTask }
    });
  };

  // UPDATE TASK
  updateTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, description, status } = req.body;

    const task = dataTasks.find(t => t.id === id);

    if (!Number.isInteger(id) || !task) {
      return res.status(404).json({
        status: false,
        message: "Tugas tidak ditemukan"
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        status: false,
        message: "Title dan description wajib diisi"
      });
    }

    if (status && status !== "pending" && status !== "completed") {
      return res.status(400).json({
        status: false,
        message: "Status harus berupa 'pending' atau 'completed'"
      });
    }

    task.title = title;
    task.description = description;
    if (status) task.status = status;

    return res.status(200).json({
      status: true,
      message: "Update Task Success",
      data: { task }
    });
  };

  // DELETE TASK
  deleteTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = dataTasks.findIndex(t => t.id === id);

    if (!Number.isInteger(id) || index === -1) {
      return res.status(404).json({
        status: false,
        message: "Tugas tidak ditemukan"
      });
    }

    const deletedTask = dataTasks.splice(index, 1)[0];

    return res.status(200).json({
      status: true,
      message: "Delete Task Success",
      data: { task: deletedTask }
    });
  };
}

export default new TaskController();
