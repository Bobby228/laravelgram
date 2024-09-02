<?php

namespace App\Http\Resources\PostImage;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostImageResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'path' => $this->path,
            'url' => $this->url,
        ];
    }
}
