# V2 Discord Message Component Builder

A **TypeScript-first builder library** for Discord's experimental **V2 Message Components**.  
It provides strongly typed, chainable builders for creating rich message layouts with containers, sections, media galleries, action rows, and interactive elements — with **zero raw JSON hassle**.

> 🔗 Reference: [Discord Developer Docs – Message Components](https://discord.com/developers/docs/components/reference)  
> 🔗 Support/Hangout Discord: [Golden Development](https://discord.goldendev.net)  
> 🔗 My YouTube Channel: [Golden Development](https://youtube.goldendev.net)  
> 🔗 My Discord Bot: [Golden Bot](https://goldenbot.net)

---

## ✨ Features

- Build **Discord V2 Message Components** with full type safety
- Chainable, ergonomic API matching Discord's new layout standards
- Advanced structural support including `Container`, `Section`, and `Media Gallery`
- Works seamlessly with **discord.js**, raw REST, or any interaction framework
- Outputs valid **Discord API payloads** instantly

---

## 🧱 Included Builders

| Component | Builder Class | Description |
|---|---|---|
| Action Row | `V2ActionRowBuilder` | Compose select menus or buttons into Discord action rows. |
| Button | `V2ButtonBuilder` | Build styled, interactive buttons with labels, emojis, custom IDs, and URLs. |
| Channel Select | `V2ChannelSelectBuilder` | Choose from specific types of server channels (text, voice, etc.). |
| Container | `V2ContainerBuilder` | Visually group components together with optional accent colors. |
| File | `V2FileBuilder` | Attach and reference single uploaded files. |
| Media Gallery | `V2MediaGalleryBuilder` | Display 1-10 media attachments in a gallery format. |
| Mentionable Select | `V2MentionableSelectBuilder` | Select users or roles with a unified component. |
| Role Select | `V2RoleSelectBuilder` | Let users choose one or more server roles. |
| Section | `V2SectionBuilder` | Contextually associate text content with an accessory component. |
| Separator | `V2SeparatorBuilder` | Add vertical padding and visual dividers between components. |
| String Select | `V2StringSelectBuilder` | Create menus with up to 25 options using custom labels, values, emojis, etc. |
| Text Display | `V2TextDisplayBuilder` | Render markdown formatted text blocks inside components. |
| Thumbnail | `V2ThumbnailBuilder` | Display visual media in a small form-factor as an accessory. |
| User Select | `V2UserSelectBuilder` | Select one or more users from the server dynamically. |

---

## 📦 Installation

```bash
npm install v2componentsbuilder
```

---

## 🚀 Example Usage

```typescript
import { ButtonStyle } from 'discord-api-types/v10';
import {
  V2ComponentBuilder,
  V2ContainerBuilder,
  V2SectionBuilder,
  V2TextDisplayBuilder,
  V2ThumbnailBuilder,
  V2SeparatorBuilder,
  V2ActionRowBuilder,
  V2ButtonBuilder
} from 'v2componentsbuilder';

const message = new V2ComponentBuilder()
  .setEphemeral(false)
  .setComponents(
    new V2ContainerBuilder()
      .setId(101)
      .setColor(0xFFA500)
      .setComponents(
        new V2SectionBuilder()
          .setId(201)
          .setComponents(
            new V2TextDisplayBuilder("### 🚀 Golden Development\nPremium Discord Bot & Workflow Automation Solutions.")
          )
          .setAccessory(
            new V2ThumbnailBuilder().setURL("attachment://logo.png")
          ),
        new V2SeparatorBuilder().setId(301).setSpacing(1).setDivider(true),
        new V2SectionBuilder()
          .setId(202)
          .setComponents(
            new V2TextDisplayBuilder(
              "**Our Core Specialties:**\n" +
              "• **High-Concurrency Architectures:** High-traffic API infrastructure, load balancers, and robust queue systems.\n" +
              "• **Workflow Automation:** Full-scale integrations with n8n, monday.com, and secure PostgreSQL endpoints.\n" +
              "• **Discord Infrastructure:** Development and scaling of production-grade community suites serving millions of users."
            )
          )
          .setAccessory(
            new V2ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setLabel("Explore Golden Bot")
              .setURL("[https://goldenbot.net](https://goldenbot.net)")
          ),
        new V2ActionRowBuilder()
          .setId(401)
          .setComponents(
            new V2ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setLabel("Join Our Discord Hub")
              .setEmoji("💬")
              .setURL("[https://discord.goldendev.net](https://discord.goldendev.net)"),
            new V2ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setLabel("Watch Tutorials on YouTube")
              .setEmoji("📺")
              .setURL("[https://youtube.goldendev.net](https://youtube.goldendev.net)")
          )
      )
  );

channel.send(message);