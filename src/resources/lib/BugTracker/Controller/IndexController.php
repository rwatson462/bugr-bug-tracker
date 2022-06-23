<?php

namespace BugTracker\Controller;

use SourcePot\Core\Controller\ControllerInterface;
use SourcePot\Core\Http\RequestInterface;
use SourcePot\Core\Http\Response\ResponseInterface;
use SourcePot\Core\Http\Response\HTMLResponse;
use SourcePot\TemplateEngine\Template;

class IndexController implements ControllerInterface
{
    public function accessCode(): string
    {
        return '';
    }

    public static function create(...$args): self
    {
        return new self;
    }

    public function execute(RequestInterface $request): ResponseInterface
    {
        $templateDirectory = dirname($_SERVER['DOCUMENT_ROOT']).'/resources/template';
        $header = new Template($templateDirectory.'/html_head.tpl', ['page-title' => 'Bug Tracker']);
        $content = new Template($templateDirectory.'/pages/index.tpl', ['page-title' => 'Bug Tracker']);
        $footer = new Template($templateDirectory.'/html_foot.tpl');
        return (new HTMLResponse())->setBody(
            $header->output() . $content->output() . $footer->output()
        );
    }
}
