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
RUNTIME_DIR := examples/studio
TAURI := cd $(RUNTIME_DIR) && pnpm tauri

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
tauri.dev:
	@$(TAURI) dev

tauri.build:
	@$(TAURI) build

tauri.bundle:
	@$(TAURI) bundle

tauri.android:
	@$(TAURI) android dev

tauri.ios:
	@$(TAURI) ios dev

# ----------------------------------------
# Turbo commands
# ----------------------------------------
turbo.boundaries:
	@pnpm turbo boundaries

turbo.pkg:
	@pnpm dlx --allow-build=esbuild @turbo/gen pkg --args $(filter-out $@,$(MAKECMDGOALS))

turbo.dry:
	@pnpm turbo clean && git clean -xdf .turbo node_modules

%:
	@:
