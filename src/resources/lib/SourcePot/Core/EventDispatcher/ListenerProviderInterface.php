<?php

namespace SourcePot\Core\EventDispatcher;

interface ListenerProviderInterface
{
    public function getListenersForEvent(StoppableEventInterface $event): iterable;
}
