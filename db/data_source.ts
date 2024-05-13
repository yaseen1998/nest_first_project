import { DataSource, DataSourceOptions } from "typeorm"

export const dataSourceOption: DataSourceOptions = {
    
        type: 'postgres',
        database: 'nest',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: '202020',
        entities: ['dist/**/*.entity{.ts,.js}'], // 'dist/**/*.entity{.ts,.js}
        synchronize: false,
        migrations: ['dist/db/migrations/*{.ts,.js}'],
      }

const dataSource = new DataSource(dataSourceOption)
export default dataSource