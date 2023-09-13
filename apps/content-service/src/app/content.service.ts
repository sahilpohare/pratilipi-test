import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {parse} from 'csv-parse';
import { Content } from './entitites/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {

  constructor( 
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>
  ){}

  parseData(data: string) {
    const records = [];
    const parser = parse({
      delimiter: ',',
      columns: true
    }); 

    parser.on('readable', function(){
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });

    parser.on('error', function(err){
      console.error(err.message);
    });

    parser.write(data);
    parser.end();

    return records.map(r => ({ title: r.title, story: r.story, publishedDate: r.published }));
  }

  async addContent(data: { userId: number, title: string, story: string }) {
    const content = this.contentRepository.create(data);
    return await this.contentRepository.save(content);
  }

  async bulkInsert(userId: number, data: { title: string, story: string }[]) {
    const content = data.map(d => this.contentRepository.create({ userId, ...d }));
    return await this.contentRepository.save(content);
  }

  async addContentBulk(userId: number, data: string) {
    const records = this.parseData(data);
    this.bulkInsert(userId, records);
  }
}
