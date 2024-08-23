package com.bookaholic.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookaholic.backend.model.Escritor;
import com.bookaholic.backend.repository.EscritorRepository;
import com.bookaholic.backend.service.EscritorEditoraService;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/escritores")
public class EscritorController {
 
   

    @Autowired
    private EscritorEditoraService escritorEditoraService;

    @PostMapping
    public ResponseEntity<?> addEscritor(@RequestBody Escritor escritor) {
        return escritorEditoraService.addEscritor(escritor);
    } 

 
    @GetMapping
    public List<Escritor> listEscritor() {
       return escritorEditoraService.findAllEscritores();
    }

    @GetMapping("/{id}")
    public Escritor findEscritor(@PathVariable Long id) {
        return escritorEditoraService.findEscritorById(id);
    }


    @PutMapping("/{id}")
    public Escritor editEscritor(@PathVariable Long id, @RequestBody Escritor escritor) {
        return escritorEditoraService.editEscritor(id, escritor);
    }


  

   
    
}
