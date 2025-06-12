const fs = require('fs');
const path = require('path');

const baseDir = './src/api';

const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const generateEmptyFiles = (featureName) => {
  const dir = path.join(baseDir, featureName);
  createDirectory(dir);

  const fileNames = [
    `${featureName}Model.ts`,
    `${featureName}Validation.ts`,
    `${featureName}Repository.ts`,
    `${featureName}Service.ts`,
    `${featureName}Controller.ts`,
    `${featureName}Router.ts`,
    `${featureName}Types.ts`,
  ];

  fileNames.forEach((fileName) => {
    const filePath = path.join(dir, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, ''); // Create an empty file
      console.log(`Created: ${filePath}`);
    } else {
      console.log(`File already exists: ${filePath}`);
    }
  });
};

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Please provide a feature name (e.g., 'user', 'order').");
  process.exit(1);
}

const featureName = args[0];
generateEmptyFiles(featureName);

// node generateFeatureFiles.js user
// node generateFeatureFiles.js order

// src/
//   api/
//     user/
//       userModel.ts
//       userValidation.ts
//       userRepository.ts
//       userService.ts
//       userController.ts
//       usersRouter.ts
