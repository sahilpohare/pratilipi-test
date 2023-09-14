import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'csv-parse';
import { Content } from './entitites/content.entity';
import { Repository } from 'typeorm';
import csv from 'csv-parse';
import stream from 'stream';

@Injectable()
export class ContentService {
  
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>
  ) {}

  async parseData(data: string): Promise<{
    title: string;
    story: string;
  }[]> {
    const csvPromise = new Promise((resolve, reject) => {
        parse(data, {}, function(err, rows) {
          if (err) {
            reject(err);
          }
          const headers = rows[0];
          rows = rows.slice(1);
          rows = rows.map((row) => {
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = row[index];
            });
            return obj;
          });
          rows = rows.map((row) => ({
            title: row.title,
            story: row.story,
          }));
          resolve(rows);
        });
    })

    return await csvPromise as any;
  }

  async addContent(data: { userId: number; title: string; story: string }) {
    const content = this.contentRepository.create(data);
    return await this.contentRepository.save(content);
  }

  async bulkInsert(userId: number, data: { title: string; story: string }[]) {
    const content = data.map((d) =>
      this.contentRepository.create({ userId, ...d })
    );
    return await this.contentRepository.save(content);
  }

  async addContentBulk(userId: number, data: string) {
    const records = await this.parseData(data);
    this.bulkInsert(userId, records);
  }
  
  getContentById(id: number) {
    return this.contentRepository.findOne({ where: { id }});
  }

  async getAllContent(userId: number) {
    return await this.contentRepository.find({ where: { userId } });
  }
}
