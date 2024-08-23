package com.bookaholic.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookaholic.backend.model.Editora;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public interface EditoraRepository extends JpaRepository<Editora, Long>{
    
    //Boolean existsByname(String nome_editora);

  

    @Query("SELECT new com.bookaholic.backend.model.Editora(e.id, e.nome_editora, e.genero, e.descricao) FROM livro  l JOIN l.editora e where l.id =  :id")
    Editora findEditoraById_Livro(Long id);


}
