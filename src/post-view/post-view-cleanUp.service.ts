import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DataSource } from "typeorm";

@Injectable()
export class PostViewCleanupService {
    constructor(private readonly datasource: DataSource){}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCleanup() {
        console.log("PostView 테이블 정리 시작");

        await this.datasource.query(`
            SET FOREIGN_KEY_CHECKS=0;
            TRUNCATE TABLE post_view;
            SET FOREIGN_KEY_CHECKS=1;
        `);

        console.log('PostView 테이블 정리 완료');
    }
}