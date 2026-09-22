#!/usr/bin/env node

const requiredEnvVars = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "AUTH_TRUST_HOST",
  "NEXTAUTH_URL",
];

const optionalGroups = [
  ["GitHub OAuth", ["GITHUB_ID", "GITHUB_SECRET"]],
  ["Google OAuth", ["GOOGLE_ID", "GOOGLE_SECRET"]],
  ["Transactional email", ["RESEND_API_KEY", "EMAIL_FROM"]],
  [
    "Cloudinary uploads",
    [
      "CLOUDINARY_CLOUD_NAME",
      "CLOUDINARY_API_KEY",
      "CLOUDINARY_API_SECRET",
    ],
  ],
];

console.log("Checking deployment environment...\n");

let hasErrors = false;

console.log("Required variables:");
requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  console.log(`  ${value ? "OK" : "MISSING"} ${varName}`);
  if (!value) hasErrors = true;
});

console.log("\nOptional integrations:");
optionalGroups.forEach(([name, variables]) => {
  const configured = variables.filter((varName) => process.env[varName]);

  if (configured.length === 0) {
    console.log(`  DISABLED ${name}`);
    return;
  }

  if (configured.length !== variables.length) {
    const missing = variables.filter((varName) => !process.env[varName]);
    console.log(`  INVALID ${name}: missing ${missing.join(", ")}`);
    hasErrors = true;
    return;
  }

  console.log(`  OK ${name}`);
});

if (hasErrors) {
  console.error("\nEnvironment validation failed.");
  process.exit(1);
}

console.log("\nEnvironment validation passed.");
