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

import com.bookaholic.backend.model.Editora;
import com.bookaholic.backend.model.Escritor;
import com.bookaholic.backend.repository.EditoraRepository;
import com.bookaholic.backend.service.EscritorEditoraService;


@RestController
@RequestMapping("/editoras")
public class EditoraController {
    
 

    @Autowired
    private EscritorEditoraService escritorEditoraService;
    
    @PostMapping
    public ResponseEntity<?> addEditora(@RequestBody Editora editora){
       return escritorEditoraService.addEditora(editora);
    }
    
    @GetMapping
    public List<Editora> listarEditoras() {
        return escritorEditoraService.findAllEditoras();
    }


    //adicionar end-point de deletar editora


    //adicionar end-point de editar editora
    

  

}
