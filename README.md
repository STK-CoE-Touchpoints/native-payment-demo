# native-payment-demo

Ejemplo de repo consumidor (React Native + Expo) que importa `PaymentScreenNative` desde `shared-payment-platform` usando Git Submodule.

## Estructura

```text
native-payment-demo/
├── external/
│   └── shared-payment-platform/   # Git Submodule
├── App.tsx
├── metro.config.js
├── tsconfig.json
└── package.json
```

## 1) Agregar el submodule

Desde la raiz de `native-payment-demo`:

```bash
git submodule add <repo-url> external/shared-payment-platform
git submodule update --init --recursive
```

Si ya clonaste el repo sin submodules:

```bash
git submodule update --init --recursive
```

## 2) Instalar dependencias y correr Expo

```bash
npm install
npm run start
```

Tambien puedes usar:

```bash
npm run android
npm run ios
```

## 3) Importar y renderizar `PaymentScreenNative`

En [App.tsx](App.tsx#L4):

```tsx
import { PaymentScreenNative } from '@shared-payment-platform/payment-ui-native';
```

En [App.tsx](App.tsx#L16), se renderiza la pantalla:

```tsx
<PaymentScreenNative currency="MXN" cardHolder="Demo Customer" />
```

## 4) Configuracion necesaria

### Metro ([metro.config.js](metro.config.js))

Se configura:
- `watchFolders` para permitir leer codigo fuera del root (`external/shared-payment-platform`)
- `resolver.extraNodeModules` para resolver aliases internos del monorepo:
  - `@shared-payment-platform/payment-ui-native`
  - `@shared-payment-platform/payment-sdk`

### TypeScript ([tsconfig.json](tsconfig.json))

Se configuran `paths` para que TypeScript reconozca los mismos aliases en editor y type-check.

## 5) Actualizar el submodule

```bash
git submodule update --remote external/shared-payment-platform
git add external/shared-payment-platform
git commit -m "chore: update shared-payment-platform submodule"
```

## Problemas comunes (React Native + submodule)

### 1. Metro no encuentra modulos del submodule

Error tipico: `Unable to resolve module @shared-payment-platform/...`

Solucion:
- verificar `watchFolders` y `extraNodeModules` en [metro.config.js](metro.config.js)
- reiniciar cache de Metro:

```bash
npx expo start -c
```

### 2. TypeScript marca import como no resuelto

Solucion:
- validar `compilerOptions.paths` en [tsconfig.json](tsconfig.json)
- reiniciar TS Server en VS Code

### 3. React duplicado / hooks invalidos

Causa frecuente: instalar `node_modules` dentro del submodule.

Solucion:
- no ejecutar `npm install` dentro de `external/shared-payment-platform`
- mantener un solo `react` y `react-native` desde el repo consumidor

### 4. Incompatibilidad de versiones RN/Expo

Solucion:
- alinear `expo`, `react`, `react-native` con versiones compatibles
- si actualizas Expo, revisa que el codigo compartido siga compilando

### 5. Cambios del submodule no reflejados

Solucion:
- correr `git submodule update --init --recursive`
- actualizar puntero con `git submodule update --remote ...`
- limpiar cache con `npx expo start -c`
