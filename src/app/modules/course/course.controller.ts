import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CourseFilterableFields } from './course.constant';
import { CourseService } from './course.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CourseFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  console.log('filters:', filters);
  console.log('options:', options);

  const result = await CourseService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course data fetched!!',
    meta: result.meta,
    data: result.data
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result
  });
});

const assignFaculties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.assignFaculties(id, req.body.faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course faculty assigned successfully',
    data: result
  });
});

export const CourseController = {
  insertIntoDB,
  getAllFromDB,
  updateOneInDB,
  assignFaculties
};
