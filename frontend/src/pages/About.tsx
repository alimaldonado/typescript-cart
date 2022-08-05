import ReactMarkdown from "react-markdown";

export const About = () => {
  return (
    <ReactMarkdown>{`
# Shopping Cart

Shopping cart made with Python and Typescript, using FastAPI and React JS

## Usage

Once cloned the repo, copy the \`docker-compose.yml.dist\` and \`.env.template\` files and use \`make\` to build the container

~~~bash
cp docker-compose.yml.dist docker-compose.yml
cp backend/.env.template backend/.env
make build
~~~

Now you can go to \`localhost:5500/docs\` and check the Swagger API Docs. You can also edit the values such as the forwarded ports, containers names, etc

  `}</ReactMarkdown>
  );
};
