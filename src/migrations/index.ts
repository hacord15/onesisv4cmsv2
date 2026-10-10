import * as migration_20261009_114839_add_job_openings from './20261009_114839_add_job_openings';

export const migrations = [
  {
    up: migration_20261009_114839_add_job_openings.up,
    down: migration_20261009_114839_add_job_openings.down,
    name: '20261009_114839_add_job_openings'
  },
];
