.PHONY: \
	bump-deps \
	changeset.add \
	changeset.version \
	changeset.publish \
	tauri.dev \
	tauri.build \
	tauri.bundle \
	tauri.android \
	tauri.ios \
	turbo.boundaries \
	turbo.pkg \
	turbo.dry

DEPS_EXCLUDE := typescript

bump-deps:
	@pnpx npm-check-updates --deep -u -x "$(DEPS_EXCLUDE)"

# ----------------------------------------
# Changeset commands
# ----------------------------------------
changeset.add:
	@pnpm changeset add

changeset.version:
	@pnpm changeset version

changeset.publish:
	@pnpm changeset publish

# ----------------------------------------
# Tauri commands
# ----------------------------------------
TAURI_DIR := examples/studio
TAURI_CMD := cd $(TAURI_DIR) && pnpm tauri

tauri.dev:
	@$(TAURI_CMD) dev

tauri.build:
	@$(TAURI_CMD) build

tauri.bundle:
	@$(TAURI_CMD) bundle

tauri.android:
	@$(TAURI_CMD) android dev

tauri.ios:
	@$(TAURI_CMD) ios dev

# ----------------------------------------
# Turbo commands
# ----------------------------------------
TURBO_CMD := pnpm dlx --allow-build=esbuild @turbo/gen

turbo.boundaries:
	@pnpm turbo boundaries

turbo.pkg:
	@$(TURBO_CMD) pkg --args $(filter-out $@,$(MAKECMDGOALS))

turbo.dry:
	@pnpm turbo clean && git clean -xdf .turbo node_modules

%:
	@:
