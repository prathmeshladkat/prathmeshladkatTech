This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
const ProjectCard = ({ project }) => {
return (
<Card className="w-[305px] h-[224px] flex flex-col border">
<CardHeader className="pb-1  px-2">
<CardTitle className="text-base font-semibold mb-0.5 text-left">
{project.name}
</CardTitle>
<p className="text-xs text-muted-foreground text-left">
{project.year}
</p>
</CardHeader>
<CardContent className="flex-1 flex flex-col gap-1 px-4 pb-2 pt-0">
<p className="text-xs text-muted-foreground leading-relaxed text-left line-clamp-3">
{project.description}
</p>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-[10px] font-medium px-2 py-0.5"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 mt-auto pt-1">
          {project.websiteUrl && (
            <Button
              asChild
              size="sm"
              className="gap-1.5 rounded-md h-7 text-xs"
            >
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-3 w-3" />
                Website
              </a>
            </Button>
          )}
          {project.sourceUrl && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="gap-1.5 rounded-md bg-transparent h-7 text-xs"
            >
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-3 w-3" />
                Source
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>

);
};
