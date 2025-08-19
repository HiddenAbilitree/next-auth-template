{
  description = "A bun template";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "systems";
  };

  outputs = {
    systems,
    nixpkgs,
    ...
  }: let
    eachSystem = f: nixpkgs.lib.genAttrs (import systems) (system: f nixpkgs.legacyPackages.${system});
  in {
    devShells = eachSystem (pkgs: let
      mkScript = name: text: let
        script = pkgs.writeShellScriptBin name text;
      in
        script;

      scripts = [
        (mkScript "dev" ''bun dev'')
        (mkScript "build" ''bun run build'')
        (mkScript "lint" ''oxlint && bun next lint'')
        (mkScript "lint:fix" ''oxlint --fix --fix-suggestions && bun next lint --fix'')
        (mkScript "haod" ''bunx @hiddenability/opinionated-defaults@latest'')
      ];
    in {
      default = pkgs.mkShell {
        buildInputs = with pkgs;
          [
            bun
            openssl
            oxlint
            eslint
          ]
          ++ scripts;
      };
    });
  };
}
