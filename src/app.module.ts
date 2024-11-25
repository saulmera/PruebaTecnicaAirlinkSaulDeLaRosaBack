import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiezasModule } from './piezas/piezas.module';
import { ProductosModule } from './productos/productos.module';
import { ProduccionesModule } from './producciones/producciones.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'DB_GESTOR',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false
    }),
    PiezasModule,
    ProductosModule,
    ProduccionesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
