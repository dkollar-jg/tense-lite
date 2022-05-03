package com.jahnelgroup.tenselite.controller

import com.jahnelgroup.tenselite.models.Greeting
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/greeting")
class GreetingController {

    @GetMapping
    fun findAllGreetings(): List<Greeting> {
        return Arrays.asList(Greeting(1, "Hello World!"));
    }
}