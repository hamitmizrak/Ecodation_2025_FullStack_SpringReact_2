package com.hamitmizrak.controller.api.interfaces;

import com.hamitmizrak.controller.api.ICrudApi;
import com.hamitmizrak.controller.api.IPicturesApi;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IBlogApi<D> extends ICrudApi<D>, IPicturesApi<D> {

    // ALL DELETE
    public ResponseEntity<String> blogApiAllDelete();

    // SPEED DATA
    public ResponseEntity<List<D>> blogApiSpeedData(Long key);

}
