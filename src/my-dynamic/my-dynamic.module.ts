import { DynamicModule, Module } from '@nestjs/common';

export interface DynamicModuleConfigs {
  apiKey: string;
  apiUrl: string;
}

export const MY_DYNAMIC_CONFIGS = 'MY_DYNAMIC_CONFIGS';

@Module({})
export class MyDynamicModule {
  static register(configs: DynamicModuleConfigs): DynamicModule {
    return {
      module: MyDynamicModule,
      imports: [],
      providers: [
        {
          provide: MY_DYNAMIC_CONFIGS,
          useValue: configs,
        },
      ],
      controllers: [],
      exports: [],
    };
  }
}
