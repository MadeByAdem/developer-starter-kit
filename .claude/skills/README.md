# Skills

Claude Code skills vendored into this starter kit. Each folder with a `SKILL.md` is a standalone skill that Claude Code automatically discovers.

## Included

| Skill | Purpose |
|-------|---------|
| `ui-ux-pro-max/` | Main design-intelligence skill: 67 UI styles, 161 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types across 15+ stacks. |
| `design-system/` | Generate a complete, tailored design system for a product (MASTER.md + page overrides). |
| `design/` | General visual-design reasoning helpers. |
| `ui-styling/` | Font rendering + style previews (includes Canvas font files). |
| `brand/` | Brand identity helpers. |
| `banner-design/` | Banner / hero composition helpers. |
| `slides/` | Presentation slide design helpers. |

## Source & License

Vendored from [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (MIT). See `LICENSE-ui-ux-pro-max.txt` for the upstream license.

## Updating

To pull in a newer version, re-run:

```bash
npx uipro-cli init --ai claude
```

or manually replace the folders above from the upstream repo.
