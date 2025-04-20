
import './App.css'
import { createBrowserRouter, RouterProvider, LoaderFunction, ActionFunction } from "react-router-dom";

// loader and action 
interface RouteCommon {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType<any>;
}

// path and element
interface Routes extends RouteCommon {
  path: string;
  Element: React.ComponentType<any>;
}

// Pages
interface Pages {
  [key: string]: {
    default: React.ComponentType<any>;
  } & RouteCommon;
}

const pages: Pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

// actual route using  fileName
const routes: Routes[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx/)?.[1];
  if (!fileName) {
    continue;
  }

  // pathName with symbols
  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  // pushes element, loader, and action
  routes.push({
    path: fileName === "landing" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

// maps the route
const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
