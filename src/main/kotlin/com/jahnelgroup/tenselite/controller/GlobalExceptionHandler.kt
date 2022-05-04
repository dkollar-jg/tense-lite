package com.jahnelgroup.tenselite.controller

import com.jahnelgroup.tenselite.exceptions.UserNotFoundException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@ControllerAdvice
class GlobalExceptionHandler : ResponseEntityExceptionHandler() {
    override fun handleMethodArgumentNotValid(
        ex: MethodArgumentNotValidException,
        headers: HttpHeaders,
        status: HttpStatus,
        request: WebRequest
    ): ResponseEntity<Any> {
        val fieldErrors = ex.bindingResult.fieldErrors.map { it.defaultMessage }
        return ResponseEntity<Any>(ErrorMessage(error = "Invalid request body.", details = fieldErrors), HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(UserNotFoundException::class)
    fun handleUserNotFoundException(e: UserNotFoundException): ResponseEntity<Any> {
        return ResponseEntity<Any>(ErrorMessage(error = "User not found.", details = listOf(e.message)), HttpStatus.BAD_REQUEST)
    }
}

data class ErrorMessage(
    var error: String?,
    var details: List<String?>?
)
