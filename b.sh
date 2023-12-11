#!/usr/bin/env bash

if [ ! -x $(which jekyll) ]
then
	gem install jekyll -y
fi

jekyll b