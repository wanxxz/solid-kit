module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testRegex: ['^(?!.*setup).*.ts'],
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  }
}
