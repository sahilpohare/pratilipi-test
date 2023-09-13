import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name'])
      .getMany();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    const updatedUser = await this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async signIn(
    name: string,
    password: string
  ): Promise<{
    accessToken: string;
    user: User;
  }> {
    const user = await this.userRepository.findOne({
      where: { name },
    });

    if (!(user && user.comparePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        name: user.name,
      }),
      user,
    };
  }

  async authenticateJwt(jwt: string): Promise<User> {
    const payload = this.jwtService.verify(jwt);
    return await this.userRepository.findOne(payload.id);
  }
}
