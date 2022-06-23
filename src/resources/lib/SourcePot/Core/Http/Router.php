<?php

namespace SourcePot\Core\Http;

use SourcePot\Core\Controller\ControllerInterface;

class Router implements RouterInterface
{
    private array $controllers = [];
    private array $routes = [];

    public static function create(): self
    {
        return new self;
    }

    public function getControllerForRoute(string $path, string $method): ControllerInterface
    {
        foreach($this->routes as $route) {
            [$pathRegex, $controllerClass, $methods] = $route;

            if(!in_array($method, $methods)) {
                continue;
            }

        // }
        // foreach($this->controllers as $pathRegex => $controllerClass) {
            $matches = [];
            preg_match('#^'.$pathRegex.'$#', $path, $matches);
            if(sizeof($matches) > 0) {
                /**
                 * $matches array contains:
                 *  0: the pattern that matched (i.e. the pattern because there is a match)
                 *  1... each capture group in the regex
                 * 
                 * We don't care about the pattern that matched, we know that already
                 */
                array_shift($matches);

                // Pass the capture groups into the controller's create method
                $controller = new $controllerClass(...$matches);

                if(!$controller instanceof ControllerInterface) {
                    throw new Exception\InvalidControllerClass($controllerClass);
                }

                return $controller;
            }
        }

        throw new Exception\NoRouteForPathException($path);
    }

    public function addRoutes(array $routes): self
    {
        foreach($routes as $route) {
            if(sizeof($route) === 2) {
                $route[] = ['GET'];
            }

            // $this->controllers[$path] = $controller;
            $this->routes[] = $route;
        }

        return $this;
    }
}