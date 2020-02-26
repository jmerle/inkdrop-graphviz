# Graphviz plugin for Inkdrop

[![Build Status](https://dev.azure.com/jmerle/inkdrop-graphviz/_apis/build/status/Build?branchName=master)](https://dev.azure.com/jmerle/inkdrop-graphviz/_build/latest?definitionId=22&branchName=master)
[![Latest release](https://img.shields.io/github/v/release/jmerle/inkdrop-graphviz)](https://my.inkdrop.app/plugins/graphviz)
[![License](https://img.shields.io/github/license/jmerle/inkdrop-graphviz)](https://github.com/jmerle/inkdrop-graphviz/blob/master/LICENSE)

This plugin makes it possible to add PlantUML diagrams to notes. It is based on my [PlantUML plugin](https://my.inkdrop.app/plugins/plantuml) and supports all major Graphviz layout programs.

## Install

```
ipm install graphviz
```

## Usage

First of all, make sure you got [Graphviz](https://www.graphviz.org/) installed and that tools like `dot` and `neato` are available on your `PATH`. After that, you can add code blocks like this:

    ```dot
    graph {
        a -- b -- c;
        b -- d;
    }
    ```

Which will be rendered as:

TODO

In the place of `dot`, you can also use `neato`, `fdp`, `sfdp`, `twopi`, `circo`, `osage` or `patchwork` if the layout program you specify is available on your `PATH`.

## Changelog

See the [GitHub releases](https://github.com/jmerle/inkdrop-graphviz/releases) for an overview of what changed in each update.

## Contributing

All contributions are welcome. Please read the [Contributing Guide](https://github.com/jmerle/inkdrop-graphviz/blob/master/CONTRIBUTING.md) first as it contains information regarding the tools used by the project and instructions on how to set up a development environment.
