import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST)', () => {
    const email = 'e2etest1@mail.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: '1234567',
      })
      .expect(HttpStatus.CREATED)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('should signup as a new user then get the currently logged in user', async () => {
    const email = 'e2etest1@mail.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: 'asdf',
      })
      .expect(HttpStatus.CREATED);

    const cookie = res.get('Set-Cookie');
    expect(cookie).toBeDefined();

    const { body } = await request(app.getHttpServer())
      .get('/auth/currentUser')
      .set('Cookie', cookie as string[])
      .expect(HttpStatus.OK);

    expect(body.email).toEqual(email);
  });
});
