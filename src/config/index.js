const path = require("path");

const env = process.env.NODE_ENV || "development";
const isDev = env === "development";

const config = {
  app: {
    env,
    isDev,
    port: process.env.PORT || 3000,
    name: "Ekuza Estates",
  },

  paths: {
    root: path.join(__dirname, "../.."),
    public: path.join(__dirname, "../../public"),
    html: path.join(__dirname, "../../public/html"),
    images: path.join(__dirname, "../../public/img"),
    script: path.join(__dirname, "../../public/js"),
  },

  security: {
    rateLimit: {
      windowMs: process.env.RATE_LIMIT_WINDOW_MS,
      limit: isDev ? 1000 : process.env.RATE_LIMIT_MAX,
    },

    cors: {
      origin: isDev ? "*" : "https://ekuzaestates.uk",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    },

    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net",
          "https://unpkg.com",
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net",
          "https://unpkg.com",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com",
          "data:",
        ],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
      },
    },

    requestLimits: {
      json: "10kb",
      urlencoded: "10kb",
    },
  },

  logging: {
    format: isDev ? "dev" : "combined",

    options: {
      skip: (req, res) => !isDev && res.statusCode < 400,
    },
  },

  compression: {
    level: 6,
    threshold: "10kb",
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  },

  cache: {
    static: {
      maxAge: isDev ? 0 : "30d",
      etag: true,
      lastModified: true,
    },
  },

  forms: {
    allowedFileTypes: [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".pdf",
      ".doc",
      ".docx",
    ],

    maxFileSize: 5 * 1024 * 1024, // 5MB

    allowedFields: [
      "firstName",
      "lastName",
      "email",
      "phone",
      "message",
      "budget",
      "date",
      "time",
    ],
  },

  errors: {
    notFound: "Requested resource not found",
    serverError: "Internal server error",
    invalidRequest: "Invalid request",
    unauthorized: "Unauthorized access",
    forbidden: "Access forbidden",
    validationError: "Validation error",
    rateLimitExceeded: "Too many requests",
  },
};

config.isProduction = () => config.app.env === "production";
config.isDevelopment = () => config.app.env === "development";
config.isTest = () => config.app.env === "test";

const validateConfig = () => {
  const requiredEnvVars = [
    "NODE_ENV",
    "PORT",
    "RATE_LIMIT_WINDOW_MS",
    "RATE_LIMIT_MAX",
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.warn(`Warning: Environment variable ${envVar} is not set`);
    }
  });

  Object.values(config.paths).forEach((path) => {
    try {
      require("fs").accessSync(path);
    } catch (err) {
      console.warn(`Warning: Path ${path} does not exist`);
    }
  });
};

if (isDev) {
  validateConfig();
}

module.exports = config;
