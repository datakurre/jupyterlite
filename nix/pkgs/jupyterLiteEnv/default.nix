{ poetry2nix }:

poetry2nix.mkPoetryEnv {
  projectDir = ./.;
  overrides = poetry2nix.overrides.withDefaults (self: super: {
    jupyterlite = super.jupyterlite.overridePythonAttrs(old: {
      src = ../../../py/jupyterlite;
      nativeBuildInputs = [ self.flit-core ];
    });
  });
}
