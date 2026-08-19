import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/template.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const createdTemplate = new this.templateModel(createTemplateDto);
    return createdTemplate.save();
  }

  async findAll(query: any = {}): Promise<Template[]> {
    const filter: any = {};
    if (query.category) {
      filter.category = query.category;
    }
    return this.templateModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Template> {
    const template = await this.templateModel.findById(id).exec();
    if (!template) {
      throw new NotFoundException(`Template #${id} not found`);
    }
    return template;
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto): Promise<Template> {
    const updatedTemplate = await this.templateModel
      .findByIdAndUpdate(id, updateTemplateDto, { new: true })
      .exec();
    if (!updatedTemplate) {
      throw new NotFoundException(`Template #${id} not found`);
    }
    return updatedTemplate;
  }

  async remove(id: string): Promise<Template> {
    const deletedTemplate = await this.templateModel.findByIdAndDelete(id).exec();
    if (!deletedTemplate) {
      throw new NotFoundException(`Template #${id} not found`);
    }
    return deletedTemplate;
  }
}
