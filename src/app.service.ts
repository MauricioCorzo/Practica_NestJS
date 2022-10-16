import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World Cahngoooo Ahora siii!!!! Mauricio Corzooo';
    }

    getUser(): string[] {
        return ['Hola desde usuario!!'];
    }
}
