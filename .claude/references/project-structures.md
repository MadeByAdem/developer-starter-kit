# Project Structures by Type

Reference file for the `project-starter` agent and for understanding project layout.

## api-only
```
project/
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── DOCUMENTATION/
│   ├── project.md
│   └── api.md
├── IMPLEMENTATION-PLANS/
├── routes/
│   └── [domain]Routes.js
├── controllers/
│   └── [domain]Controller.js
├── services/
│   └── [domain]Service.js
├── repositories/
│   ├── baseRepository.js
│   └── [domain]Repository.js
├── middleware/
│   ├── authMiddleware.js
│   ├── validationMiddleware.js
│   └── errorHandler.js
├── utils/
│   ├── errors.js
│   └── asyncHandler.js
├── config/
│   ├── supabase.js
│   └── logger.js
├── logs/                    ← Created by Winston logger (gitignored)
└── database/
    └── migrations/
        └── YYYYMMDDHHMMSS_name.sql
```

## vue-only
```
project/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── .gitignore
├── README.md
├── DOCUMENTATION/
│   └── project.md
├── IMPLEMENTATION-PLANS/
└── src/
    ├── App.vue
    ├── main.js
    ├── router.js
    ├── views/
    │   └── [Screen].vue
    ├── components/
    │   └── [feature]/
    │       └── [Component].vue
    ├── stores/
    │   └── [domain].js
    ├── services/
    │   ├── apiClient.js
    │   └── [domain]Service.js
    ├── composables/
    │   └── use[Feature].js
    └── assets/
        └── main.css
```

## nuxt-only
```
project/
├── nuxt.config.ts
├── package.json
├── app.vue
├── .env.example
├── .gitignore
├── README.md
├── DOCUMENTATION/
│   └── project.md
├── IMPLEMENTATION-PLANS/
├── pages/
│   └── index.vue
├── components/
│   └── [Component].vue
├── composables/
│   └── use[Feature].ts
├── stores/
│   └── [domain].ts
├── services/
│   └── apiClient.js         ← Uses $fetch + useRuntimeConfig() (not Axios)
├── server/
│   ├── api/
│   │   └── [endpoint].ts
│   └── middleware/
├── assets/
│   └── css/
│       └── main.css
└── database/
    └── migrations/
        └── YYYYMMDDHHMMSS_name.sql
```

## express-vue

```
project/
├── .gitignore
├── README.md
├── DOCUMENTATION/
│   ├── project.md
│   └── api.md
├── IMPLEMENTATION-PLANS/
├── server/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── logs/                ← Created by Winston logger (gitignored)
├── frontend/
│   ├── package.json
│   ├── .env.example         ← Contains VITE_API_URL
│   └── src/
│       ├── App.vue
│       ├── main.js
│       ├── router.js
│       ├── views/
│       ├── components/
│       ├── stores/
│       ├── services/
│       │   └── apiClient.js  ← Uses import.meta.env.VITE_API_URL
│       └── composables/
└── database/
    └── migrations/
        └── YYYYMMDDHHMMSS_name.sql
```

## express-nuxt

```
project/
├── .gitignore
├── README.md
├── DOCUMENTATION/
│   ├── project.md
│   └── api.md
├── IMPLEMENTATION-PLANS/
├── server/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── logs/                ← Created by Winston logger (gitignored)
├── frontend/
│   ├── package.json
│   ├── nuxt.config.ts
│   ├── .env.example         ← Contains NUXT_PUBLIC_API_URL
│   ├── pages/
│   ├── components/
│   ├── composables/
│   ├── stores/
│   └── services/
│       └── apiClient.js      ← Uses $fetch + useRuntimeConfig() (not Axios)
└── database/
    └── migrations/
        └── YYYYMMDDHHMMSS_name.sql
```

## python-script

```text
project/
├── main.py
├── requirements.txt
├── .env.example
├── .gitignore
├── README.md
├── DOCUMENTATION/
│   └── project.md
├── IMPLEMENTATION-PLANS/
├── src/
│   ├── __init__.py
│   └── [module].py
├── config/
│   └── settings.py
└── data/                    ← Input/output data files (gitignored if large)
```
