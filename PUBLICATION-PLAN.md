# Lokal publiseringsplan – 2026-11-07

Planen beskriver inventaret før første publiseringscommit. Listen er en gjennomgangsplan, ikke godkjenning til å publisere alle filer. Push krever separat godkjenning.

## Repository og bevaring

GitHub-repository: `Anday2025/CleanPlan` (offentlig). Gammel URL `Anday2025/cleaning-app` peker til samme repository-ID 1352251103. Lokal HEAD og remote main var begge `71c053e96a2638e6fe0dcbb7219c5150f0850ea0`. Tilkoblet konto har push-rettighet. Origin er oppdatert; branch er `codex/launch-foundation-onboarding`. Ingen historikk er overskrevet.

## Første commit – klar for godkjenning

- `.gitignore`
- `PUBLICATION-PLAN.md`

Kun publiseringshygiene og denne planen. Ikke bruk `git add .`. Etter godkjenning skal kun eksplisitte filstier stages, deretter skal staged diff og hemmelighetsskanning kontrolleres på nytt.

## Kandidater for senere funksjonsvise commits

Følgende eksplisitte filsett er inventert. De er ikke endelig publiseringsgodkjent: avhengigheter til hold-listen og testfeilen må avklares før staging.

### Frontend, moduler og stilark

- `area-cleaning.html`
- `area-documentation.html`
- `area-housing.html`
- `css/index.css`
- `css/onboarding.css`
- `css/users.css`
- `index.html`
- `js/area-access.js`
- `js/area-cleaning.js`
- `js/area-documentation.js`
- `js/area-housing.js`
- `js/auth-return.js`
- `js/auth.js`
- `js/camera-capture.js`
- `js/cleaning-time.js`
- `js/config.js`
- `js/language.js`
- `js/onboarding.js`
- `js/password-return.js`
- `js/profile-onboarding.js`
- `js/reset-password.js`
- `js/users.js`
- `onboarding.html`
- `package.json`
- `reset-password.html`

### Edge-kilde (ingen deploy)

- `supabase/functions/admin-create-user/index.ts`
- `supabase/functions/admin-create-user/redirect-policy.mjs`

### Tester og eksisterende backend-pakker

- `tests/README.md`
- `tests/backend/CUSTOMER-ACCESS-MATRIX.md`
- `tests/backend/foundation-package/README.md`
- `tests/backend/housing-package/README.md`
- `tests/backend/identity-package/migration.sql`
- `tests/backend/new-user-package/migration.sql`
- `tests/backend/photo-operations.sql`
- `tests/backend/photo-package/README.md`
- `tests/backend/profile-package/migration.sql`
- `tests/browser/backend/contracts.mjs`
- `tests/browser/backend/diagnostics.mjs`
- `tests/browser/backend/run.mjs`
- `tests/browser/backend/suite.mjs`
- `tests/browser/cleaning-backend/README.md`
- `tests/browser/cleaning-backend/action-diagnostics.mjs`
- `tests/browser/cleaning-backend/cleanup.mjs`
- `tests/browser/cleaning-backend/contracts.mjs`
- `tests/browser/cleaning-backend/run.mjs`
- `tests/browser/cleaning-backend/suite.mjs`
- `tests/browser/cleaning/flows.test.mjs`
- `tests/browser/email/before.mjs`
- `tests/browser/email/contracts.mjs`
- `tests/browser/email/failure-notice.mjs`
- `tests/browser/email/run.mjs`
- `tests/browser/flows.test.mjs`
- `tests/browser/housing-backend/README.md`
- `tests/browser/housing-backend/contracts.mjs`
- `tests/browser/housing-backend/preflight.mjs`
- `tests/browser/housing-backend/run.mjs`
- `tests/browser/housing-backend/suite.mjs`
- `tests/browser/housing/README.md`
- `tests/browser/housing/flows.test.mjs`
- `tests/browser/onboarding/README.md`
- `tests/browser/onboarding/flows.test.mjs`
- `tests/browser/onboarding/mock-sdk.js`
- `tests/browser/onboarding/playwright-loader.mjs`
- `tests/browser/onboarding/server.mjs`
- `tests/browser/photo-backend/MOBILE.md`
- `tests/browser/photo-backend/README.md`
- `tests/browser/photo-backend/attempt.mjs`
- `tests/browser/photo-backend/contracts.mjs`
- `tests/browser/photo-backend/database-prechecks.mjs`
- `tests/browser/photo-backend/evidence.mjs`
- `tests/browser/photo-backend/fixture-diagnostics.mjs`
- `tests/browser/photo-backend/integrity.mjs`
- `tests/browser/photo-backend/manifest-paths.json`
- `tests/browser/photo-backend/mobile.mjs`
- `tests/browser/photo-backend/run.mjs`
- `tests/browser/photo-backend/sdk-lock.json`
- `tests/browser/photo-backend/suite.mjs`
- `tests/browser/photo-backend/vendor/LICENSE.supabase`
- `tests/browser/photo-backend/vendor/supabase-2.49.8.js`
- `tests/browser/photo-backend/verification.mjs`
- `tests/browser/photo/flows.test.mjs`
- `tests/browser/photo/integrity.test.mjs`
- `tests/fixtures/admin-create-user-v10.txt`
- `tests/integration/auth-return/README.md`
- `tests/integration/auth-return/isolation.test.mjs`
- `tests/integration/auth-return/login.html`
- `tests/integration/auth-return/server.mjs`
- `tests/integration/cleaning/README.md`
- `tests/integration/cleaning/api-ready.mjs`
- `tests/integration/cleaning/before-image.mjs`
- `tests/integration/cleaning/run-cleaning.mjs`
- `tests/integration/cleaning/schedule-suite.mjs`
- `tests/integration/cleaning/suite.mjs`
- `tests/integration/foundation/REGRESSION.md`
- `tests/integration/foundation/read-status.mjs`
- `tests/integration/foundation/run-foundation.mjs`
- `tests/integration/foundation/suite.mjs`
- `tests/integration/housing/before-image.mjs`
- `tests/integration/housing/cleanup-report.mjs`
- `tests/integration/housing/cleanup.mjs`
- `tests/integration/housing/legacy-read.mjs`
- `tests/integration/housing/resume-cleanup.mjs`
- `tests/integration/housing/run-housing.mjs`
- `tests/integration/housing/suite.mjs`
- `tests/integration/identity/README.md`
- `tests/integration/identity/package.mjs`
- `tests/integration/identity/run-identity.mjs`
- `tests/integration/identity/suite.mjs`
- `tests/integration/invited-flow/README.md`
- `tests/integration/invited-flow/run-invited-flow.mjs`
- `tests/integration/new-user/README.md`
- `tests/integration/new-user/confirmation.mjs`
- `tests/integration/new-user/package.mjs`
- `tests/integration/new-user/preflight-diagnostics.mjs`
- `tests/integration/new-user/run-new-user.mjs`
- `tests/integration/new-user/suite.mjs`
- `tests/integration/onboarding/README.md`
- `tests/integration/onboarding/run-onboarding.mjs`
- `tests/integration/onboarding/suite.mjs`
- `tests/integration/photo-suite.mjs`
- `tests/integration/photo/adapter.mjs`
- `tests/integration/photo/batch-signing.mjs`
- `tests/integration/photo/cleanup.mjs`
- `tests/integration/photo/edge/README.md`
- `tests/integration/photo/edge/cleanup-edge.mjs`
- `tests/integration/photo/edge/diagnose.mjs`
- `tests/integration/photo/edge/lifecycle.mjs`
- `tests/integration/photo/edge/photo-receipt.mjs`
- `tests/integration/photo/edge/source.mjs`
- `tests/integration/photo/hidden-prompt.mjs`
- `tests/integration/photo/image-handler.mjs`
- `tests/integration/photo/image-response.mjs`
- `tests/integration/photo/inflight/README.md`
- `tests/integration/photo/inflight/periodic.mjs`
- `tests/integration/photo/inflight/scheduler.mjs`
- `tests/integration/photo/inflight/slow-upload.mjs`
- `tests/integration/photo/route-diagnostics.mjs`
- `tests/integration/photo/transport.mjs`
- `tests/integration/preflight.mjs`
- `tests/integration/profile/package.mjs`
- `tests/integration/profile/run-profile.mjs`
- `tests/integration/profile/suite.mjs`
- `tests/integration/scenarios.test.mjs`
- `tests/integration/self-registration/README.md`
- `tests/integration/self-registration/local-callback.mjs`
- `tests/integration/self-registration/login-diagnostics.mjs`
- `tests/integration/self-registration/read-auth-settings.mjs`
- `tests/integration/shared-photo/README.md`
- `tests/integration/shared-photo/SCHEDULER.md`
- `tests/integration/shared-photo/adapter.mjs`
- `tests/integration/shared-photo/api-ready.mjs`
- `tests/integration/shared-photo/before-image.mjs`
- `tests/integration/shared-photo/run-shared-photo.mjs`
- `tests/integration/shared-photo/scheduler.mjs`
- `tests/password-return.test.mjs`
- `tests/support/api-diagnostics.mjs`
- `tests/support/app-function.mjs`
- `tests/support/check-syntax.mjs`
- `tests/support/concurrency.mjs`
- `tests/support/reporter.mjs`
- `tests/support/run-artifacts.mjs`
- `tests/support/sql-diagnostics.mjs`
- `tests/support/target.mjs`
- `tests/unit/area-cleaning.test.mjs`
- `tests/unit/attempt-journal.test.mjs`
- `tests/unit/auth-settings.test.mjs`
- `tests/unit/auth.test.mjs`
- `tests/unit/browser-backend-diagnostics.test.mjs`
- `tests/unit/browser-backend.test.mjs`
- `tests/unit/browser-email-failure.test.mjs`
- `tests/unit/browser-email.test.mjs`
- `tests/unit/cleaning-action-diagnostics.test.mjs`
- `tests/unit/cleaning-package.test.mjs`
- `tests/unit/cleaning-schedule.test.mjs`
- `tests/unit/concurrency.test.mjs`
- `tests/unit/customer-access-matrix.test.mjs`
- `tests/unit/foundation.test.mjs`
- `tests/unit/housing-browser-backend.test.mjs`
- `tests/unit/housing-cleanup-report.test.mjs`
- `tests/unit/housing-package-order.test.mjs`
- `tests/unit/housing-preflight.test.mjs`
- `tests/unit/housing.test.mjs`
- `tests/unit/identity.test.mjs`
- `tests/unit/local-callback.test.mjs`
- `tests/unit/login-diagnostics.test.mjs`
- `tests/unit/mobile-integrity.test.mjs`
- `tests/unit/mobile-login-regression.test.mjs`
- `tests/unit/mobile-runner.test.mjs`
- `tests/unit/new-user.test.mjs`
- `tests/unit/onboarding-server.test.mjs`
- `tests/unit/onboarding.test.mjs`
- `tests/unit/photo-batch-signing.test.mjs`
- `tests/unit/photo-browser.test.mjs`
- `tests/unit/photo-cleanup.test.mjs`
- `tests/unit/photo-contract.test.mjs`
- `tests/unit/photo-edge.test.mjs`
- `tests/unit/photo-fixture-diagnostics.test.mjs`
- `tests/unit/photo-periodic.test.mjs`
- `tests/unit/photo-response.test.mjs`
- `tests/unit/photo-route-diagnostics.test.mjs`
- `tests/unit/photo-runner.test.mjs`
- `tests/unit/photo-sql-result.test.mjs`
- `tests/unit/photo-verification.test.mjs`
- `tests/unit/preflight-diagnostics.test.mjs`
- `tests/unit/profile-package.test.mjs`
- `tests/unit/reporter.test.mjs`
- `tests/unit/resident.test.mjs`
- `tests/unit/shared-photo.test.mjs`
- `tests/unit/shared-scheduler.test.mjs`
- `tests/unit/signed-history-regression.test.mjs`
- `tests/unit/target.test.mjs`

### Foundation v2 og lokal PostgreSQL-adapter

- `tests/drafts/foundation-v2/001-schema.draft.sql`
- `tests/drafts/foundation-v2/002-controls.draft.sql`
- `tests/drafts/foundation-v2/POSTGRES-TEST-PLAN.md`
- `tests/drafts/foundation-v2/README.md`
- `tests/drafts/foundation-v2/postgres/NEXT-SECURITY-TESTS.md`
- `tests/drafts/foundation-v2/postgres/README.md`
- `tests/drafts/foundation-v2/postgres/adapter.mjs`
- `tests/drafts/foundation-v2/postgres/adapter.test.mjs`
- `tests/drafts/foundation-v2/postgres/concurrency-plan.mjs`
- `tests/drafts/foundation-v2/postgres/prepare.mjs`
- `tests/drafts/foundation-v2/postgres/rollback-script.mjs`
- `tests/drafts/foundation-v2/postgres/rollback-script.test.mjs`
- `tests/drafts/foundation-v2/postgres/security-scenarios.mjs`
- `tests/drafts/foundation-v2/postgres/security-scenarios.test.mjs`
- `tests/drafts/foundation-v2/postgres/source-lock.json`
- `tests/drafts/foundation-v2/postgres/synthetic.mjs`
- `tests/drafts/foundation-v2/static.test.mjs`

## Hold – ikke ta med uten særskilt gjennomgang

- `tests/backend/cleaning-package/migration.sql` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.
- `tests/backend/current-photo-dependencies.json` — backend-uttrekk krever innholdsgodkjenning.
- `tests/backend/foundation-package/migration.sql` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.
- `tests/backend/housing-package/migration.sql` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.
- `tests/backend/observed-schema.json` — backend-uttrekk krever innholdsgodkjenning.
- `tests/backend/photo-package/migration.sql` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.
- `tests/backend/shared-photo-package/migration.sql` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.
- `tests/browser/backend/README.md` — konkret e-post eller kontaktverdi krever klassifisering.
- `tests/browser/email/README.md` — konkret e-post eller kontaktverdi krever klassifisering.
- `tests/drafts/foundation-v2/postgres/prepare.test.mjs` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.
- `tests/integration/foundation/before-image.mjs` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.
- `tests/integration/invited-flow/contracts.mjs` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning; konkret e-post eller kontaktverdi krever klassifisering.
- `tests/integration/photo/before-image.mjs` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.
- `tests/integration/photo/run-photo.mjs` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.
- `tests/integration/profile/README.md` — konkret e-post eller kontaktverdi krever klassifisering.
- `tests/integration/profile/contracts.mjs` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning; konkret e-post eller kontaktverdi krever klassifisering.
- `tests/integration/self-registration/run-signup.mjs` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning; konkret e-post eller kontaktverdi krever klassifisering.
- `tests/unit/invited-flow.test.mjs` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.
- `tests/unit/sql-diagnostics.test.mjs` — konkret identitets-ID; ikke anonymiser sikkerhetskontroller uten godkjenning.

## Lokale filer som skal bevares, men ikke publiseres

- Lokale IDE-kjørekonfigurasjoner under `.run/`.
- Kjøringsspesifikke testjournaler under `.run/foundation-v2-rollback/`.
- Lokale integritetsmapper under `.run/`, inkludert evidens, manifest, gjennomgangsrapport og testutskrift.

Hele `.run/`, `.env*`, private nøkkelfiler, lokale databasekopier, test-results, playwright-report og tests/.runtime er ignorert. Ingen filer er slettet. Gitignore beskytter ikke allerede sporede filer; ingen sporede nøkkel-/env-/databasefiler ble funnet. SQL-kildeutkast ignoreres ikke.

## Personopplysninger og hemmeligheter

Konkrete beskyttede identiteter er holdt uendret. Syntetiske nøkler/passord i redaksjonstester er testdata, ikke legitimasjon. Offentlige browserkonfigurasjonsverdier er ikke administrative hemmeligheter. Eksisterende kontaktverdier i index.html og js/language.js krever at eier fortsatt ønsker dem offentlige. Backend-skjedeuttrekk og konkrete kontoidentiteter holdes tilbake. Skanning av nåværende kandidater fant ingen bekreftet privat nøkkel eller administrativ token; dette er ikke bevis på fravær av alle hemmeligheter eller en full revisjon av Git-historikken.

## Avhengigheter og commit-rekkefølge

1. Publiseringshygiene: .gitignore og dette dokumentet.
2. Lokalt testrammeverk, kontrakter og pakker etter identitetsgjennomgang. Foundation v2-originaler, kildehashlås og adapter må behandles samlet; ikke regenerer sikkerhetskritiske hasher bare for publisering.
3. Auth/onboarding som samlet endring: index.html, auth.js, config.js, auth-return.js, profile-onboarding.js, onboarding-filer og tilhørende tester. Avklar den utdaterte Auth-testfixturen først.
4. Passordretur samlet: reset-password.html, js/reset-password.js, js/password-return.js og relaterte tester. HTML laster den nye modulen; wrapperen må ikke publiseres alene.
5. Brukeradministrasjon samlet med css/users.css og tilhørende språkressurser. js/users.js bruker fortsatt Supabase-klienten, profiles og admin-create-user; fjerning av duplisert rendering må ikke forveksles med en selvstendig, backendfri modul.
6. Områder, bolig, renhold, kamera og bildedokumentasjon med alle lokale moduler, sider og regresjonstester. Ingen ny deploy eller backendendring er inkludert i denne planen.

## Lokale kontrollresultater

- npm test: 250 bestått, 2 feil, 14 NOT_RUN i sandbox.
- Callback-feilen var listen EPERM på 127.0.0.1. Isolert ny kjøring uten sandbox-begrensningen: 2/2 bestått.
- Gjenstående auth.test.mjs: forventet admin.html, fikk tom adresse. Aktiv profilfixture mangler id; eksisterende streng profilvalidering avviser id som ikke samsvarer med brukeren. Ingen Auth-/testkode er rettet i publiseringsoppgaven.
- Foundation v2, adapter og kundekontrakt: 109/109 bestått.
- npm run test:syntax bestod. git diff --check bestod.
- Ingen backend-/Docker-/Supabase-tester er kjørt. Utestede scenarioer er ikke markert bestått.

## Stoppunkt

Ingen samlet app-commit eller push anbefales før Auth-testavviket og hold-listen er avklart. Første hygiene-commit kan godkjennes separat. Ingen beskyttet identitet er erstattet, ingen funksjon er endret, og intet lokalt arbeid er slettet.
