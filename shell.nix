{ pkgs ? import ./nix {}
, sources ? import ./nix/sources.nix
}:

pkgs.mkShell {
  buildInputs = with pkgs; [
    gnumake
    niv
    (yarn.override {
      nodejs = nodejs-14_x;
    })
    nodejs-14_x
    poetry
    poetry2nix.cli
    jupyterLiteEnv
#   (jupyterWith.jupyterlabWith {})
  ];
  shellHook = ''
    export SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt
  '';
}
