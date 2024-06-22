// tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    try {
      return this.tasksService.findAll();
    } catch (error) {
      throw new BadRequestException('Error fetching tasks');
    }
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return this.tasksService.create(createTaskDto);
    } catch (error) {
      throw new BadRequestException('Error Creating new task');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    try {
      return this.tasksService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Error fetching Task details');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      await this.tasksService.update(id, updateTaskDto);
      return { success: true, message: 'Successfully Updated Task' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException('Error Updating the task');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.tasksService.delete(id);
      return { success: true, message: 'Successfully deleted' };
    } catch (error) {
      console.log(error);

      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Error deteting task');
    }
  }
}
